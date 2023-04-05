const rclone = require('rclone.js');
const { resolve } = require('path');
const AWS = require('aws-sdk');
const errorGenerator = require('./errorGenerator');

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

  try {
    const rcloneCopy = rclone('copy', originString, destinationString, {
      env: {
        RCLONE_CONFIG: resolve(__dirname, '../../rclone.conf')
      },
      progress: true
    });

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
  const { accessId, secretKey, serviceProvider, accountId } = req.body;
  //Make sure all required parameters exist on the req.body.
  if (!accessId || !secretKey || !serviceProvider)
    return next({
      log: 'Error in rcloneListBuckets middleware.',
      message:
        'Must POST a Service Provider, Access ID, Secret Key, and an Account ID.'
    });
  //Cloudflare specific required parameters.
  if (serviceProvider === 'Cloudflare' && !accountId)
    return next({
      log: 'Error in rcloneListBuckets middleware.',
      message: 'Must POST an Account ID when using Cloudflare.'
    });

  //Update the AWS config file with correct credentials depending on the service.
  try {
    if (serviceProvider === 'AWS') {
      AWS.config.update({
        accessKeyId: accessId,
        secretAccessKey: secretKey
      });
    } else if (serviceProvider === 'Cloudflare') {
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
  } catch (error) {
    return next({
      //CAN ADD ROBUST, SPECIFIC ERROR HANDLING LATER ON. EX, IF SERVICE IS CLOUDFLARE AND MESSAGE IS "UNAUTHORIZED", IT'S LIKELY AN INCORRECT ACCESS ID.
      log: error.message,
      message: errorGenerator(error, serviceProvider)
    });
  }
};

module.exports = { rCloneCopyController, rcloneListBuckets };
