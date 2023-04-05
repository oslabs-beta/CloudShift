//This controller parses the req.body and assigns provided input variables to variables that can be used by the fsController.
const AWS = require('aws-sdk');

const getBucketLoc = async (req, res, next) => {
  //REFACTOR THIS. NOTE THAT YOU CAN'T TRANSFER FROM AMAZON TO AMAZON WITH THE CURRENT LOGIC.
  if (req.body.originProvider === 'AWS') {
    try {
      AWS.config.update({
        accessKeyId: req.body.originAccessId,
        secretAccessKey: req.body.originSecretKey
      });
      const s3 = new AWS.S3();
      const data = await s3
        .getBucketLocation({ Bucket: req.body.originBucket })
        .promise();
      res.locals.awsRegion = data.LocationConstraint;
      //NEED TO RETURN US-EAST-1 IF STRING IS ''.
      if (res.locals.awsRegion === '') res.locals.awsRegion = 'us-east-1';
    } catch (err) {
      // console.log('Error:', err);
    }
  }
  if (req.body.destinationProvider === 'AWS') {
    try {
      AWS.config.update({
        accessKeyId: req.body.destAccessId,
        secretAccessKey: req.body.destSecretKey
      });
      const s3 = new AWS.S3();
      const data = await s3
        .getBucketLocation({ Bucket: req.body.destinationBucket })
        .promise();
      res.locals.awsRegion = data.LocationConstraint;
      //NEED TO RETURN US-EAST-1 IF STRING IS ''.
      if (res.locals.awsRegion === '') res.locals.awsRegion = 'us-east-1';
    } catch (err) {
      console.log('Error:', err);
    }
  }
  //DO A CHECK THERE TO SEE IF AWS REGION IS BLANK, IF SO, THROW AN ERROR TO THE CLIENT.
  //WILL NEED TO MODIFY LOGIC TO CONSIDER IF BOTH BUCKETS ARE AWS AT SOME POINT.
  if (!res.locals.awsRegion) {
    return next({
      log: 'Error in getBucketLoc',
      message: `Could not select AWS region for bucket ${
        req.body.originProvider === 'AWS'
          ? req.body.originBucket
          : req.body.destinationBucket
      }. Make sure your credentials have correct permissions and try again.`
    });
  }

  return next();
};

const assignVariablesForFS = (req, res, next) => {
  //DO ERROR LOGIC HERE IF ALL THESE VARIABLES DON'T EXIST.
  const {
    originProvider,
    originAccessId,
    originSecretKey,
    originAccountId,
    destinationProvider,
    destAccessId,
    destSecretKey,
    destAccountId
  } = req.body;

  //Set the origin info.
  if (originProvider === 'AWS') {
    res.locals.awsAccessId = originAccessId;
    res.locals.awsSecretKey = originSecretKey;
  } else if (originProvider === 'Cloudflare') {
    res.locals.cloudflareAccessId = originAccessId;
    res.locals.cloudflareSecretKey = originSecretKey;
    res.locals.cloudflareAccountId = originAccountId;
  }
  //Set the destination info.
  if (destinationProvider === 'AWS') {
    res.locals.awsAccessId = destAccessId;
    res.locals.awsSecretKey = destSecretKey;
  } else if (destinationProvider === 'Cloudflare') {
    res.locals.cloudflareAccessId = destAccessId;
    res.locals.cloudflareSecretKey = destSecretKey;
    res.locals.cloudflareAccountId = destAccountId;
  }
  return next();
};

module.exports = { assignVariablesForFS, getBucketLoc };
