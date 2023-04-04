const rclone = require('rclone.js');
const { resolve } = require('path');
const AWS = require('aws-sdk');

const rCloneCopyController = (req, res, next) => {
  //Build the strings for rClone to do the copying.
  const {
    originProvider,
    destinationProvider,
    originBucket,
    destinationBucket
  } = req.body;

  const originString = `${originProvider.toLowerCase()}:${originBucket.toLowerCase()}`;
  const destinationString = `${destinationProvider.toLowerCase()}:${destinationBucket.toLowerCase()}`;

  console.log(originString, destinationString);

  try {
    const rcloneCopy = rclone('copy', originString, destinationString, {
      env: {
        RCLONE_CONFIG: resolve(__dirname, '../../rclone.conf')
      },
      progress: true
    });

    console.log('TRANSFER IN PROGRESS');
    rcloneCopy.stdout.on('data', (data) => {
      console.log(data.toString());
    });

    rcloneCopy.stderr.on('data', (data) => {
      console.error(data.toString());
    });

    return next();
  } catch (e) {
    console.log(e);
    return next({ e });
  }
};

const rcloneListBuckets = async (req, res, next) => {
  try {
    const { accessId, secretKey, serviceProvider, accountId } = req.body;
    //console.log(accessId, secretKey, serviceProvider, accountId);

    //Set the config file for retrieving buckets.

    if (serviceProvider === 'Amazon') {
      AWS.config.update({
        accessKeyId: accessId,
        secretAccessKey: secretKey
      });
    } else if (serviceProvider === 'CloudFlare') {
      AWS.config.update({
        accessKeyId: accessId,
        secretAccessKey: secretKey,
        signatureVersion: 'v4',
        endpoint: `https://${accountId}.r2.cloudflarestorage.com/`
      });
    }

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

module.exports = { rCloneCopyController, rcloneListBuckets };
