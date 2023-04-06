const rclone = require('rclone.js');
const { resolve } = require('path');
const AWS = require('aws-sdk');
const errorGenerator = require('../services/errorGenerator');

//NEED LOTS OF ERROR HANDLING LOGIC HERE.
const rCloneCopyController = (req, res, next) => {
  // Build the strings for rClone to do the copying.
  const {
    originProvider,
    destinationProvider,
    originBucket,
    destinationBucket
  } = req.body;

  const originString = `${originProvider.toLowerCase()}:${originBucket.toLowerCase()}`;
  const destinationString = `${destinationProvider.toLowerCase()}:${destinationBucket.toLowerCase()}`;

  try {
    res.locals.rcloneCopy = rclone('copy', originString, destinationString, {
      env: {
        RCLONE_CONFIG: resolve(__dirname, '../../rclone.conf')
      },
      progress: true
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
    const data = await s3.listBuckets().promise();
    const buckets = data.Buckets.map((bucket) => bucket.Name);
    //Throw an error if there are no buckets associated with
    if (!buckets.length)
      return next({
        message: `There are no buckets associated with your ${serviceProvider} account.`
      });
    res.locals.buckets = buckets;
    return next();
  } catch (error) {
    const { message, field } = errorGenerator(error, serviceProvider);
    return next({
      log: error.message,
      message,
      field
    });
  }
};

module.exports = { rCloneCopyController, rcloneListBuckets };
