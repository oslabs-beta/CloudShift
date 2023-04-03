const rclone = require('rclone.js');
const { resolve } = require('path');
const AWS = require('aws-sdk');

const rcloneCopy = rclone(
  'copy',
  'aws:test-bucket-osp-e',
  'cloudflare:osp-e-example-bucket',
  {
    env: {
      RCLONE_CONFIG: resolve(__dirname, '../../rclone.conf')
    },
    progress: true
  }
);

const rcloneListBuckets = async (req, res, next) => {
  try {
    const { accessId, secretKey } = req.body;

    //Set the config file for retrieving buckets.
    AWS.config.update({
      accessKeyId: accessId,
      secretAccessKey: secretKey
    });
    const s3 = new AWS.S3();

    //Return the list of buckets, names only.
    //SEE WHAT HAPPENS IF THE BUCKET LIST IS EMPTY. DOES IT THROW AN ERROR OR NOT.
    //YOU CAN ERROR CHECK HERE TO SEE IF CREDENTIALS ARE INVALID!!!
    //YOU'LL PROBABLY WANT TO DO A LOT OF ERROR HANDLING HERE!!
    const data = await s3.listBuckets().promise();
    const buckets = data.Buckets.map((bucket) => bucket.Name);
    res.locals.buckets = buckets;
    return next();
  } catch (e) {
    console.log(e);
    return next(e);
  }
};

module.exports = { rcloneCopy, rcloneListBuckets };

// rcloneCopy.stdout.on('data', (data) => {
//   console.log(data.toString());
// });

// rcloneCopy.stderr.on('data', (data) => {
//   console.error(data.toString());
// });
