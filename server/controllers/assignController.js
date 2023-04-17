const AWS = require("aws-sdk");

const getBucketLoc = async (req, res, next) => {
  if (
    req.body.originProvider === "AWS" ||
    req.body.destinationProvider === "AWS"
  ) {
    if (req.body.originProvider === "AWS") {
      try {
        AWS.config.update({
          accessKeyId: req.body.originAccessId,
          secretAccessKey: req.body.originSecretKey,
        });
        const s3 = new AWS.S3();
        const data = await s3
          .getBucketLocation({ Bucket: req.body.originBucket })
          .promise();
        res.locals.awsRegion = data.LocationConstraint;
        //NEED TO RETURN US-EAST-1 IF STRING IS ''.
        if (res.locals.awsRegion === "") res.locals.awsRegion = "us-east-1";
      } catch (err) {
        return next({
          log: `Unkown error:, ${err}`,
          message: "Unknown error when getting bucket location.",
        });
      }
    }
    if (req.body.destinationProvider === "AWS") {
      try {
        AWS.config.update({
          accessKeyId: req.body.destAccessId,
          secretAccessKey: req.body.destSecretKey,
        });
        const s3 = new AWS.S3();
        const data = await s3
          .getBucketLocation({ Bucket: req.body.destinationBucket })
          .promise();
        res.locals.awsRegion = data.LocationConstraint;
        //NEED TO RETURN US-EAST-1 IF STRING IS ''.
        if (res.locals.awsRegion === "") res.locals.awsRegion = "us-east-1";
      } catch (err) {
        return next({
          log: `Unkown error:, ${err}`,
          message: "Unknown error when getting bucket location.",
        });
      }
    }
    //WILL NEED TO MODIFY LOGIC TO CONSIDER IF BOTH BUCKETS ARE AWS AT SOME POINT.
    if (!res.locals.awsRegion) {
      return next({
        log: "Error in getBucketLoc",
        message: `Could not select AWS region for bucket ${
          req.body.originProvider === "AWS"
            ? req.body.originBucket
            : req.body.destinationBucket
        }. Make sure your credentials have correct permissions and try again.`,
      });
    }
  }
  return next();
};

//This controller parses the req.body and assigns provided input variables to variables that can be used by the fsController.
const assignVariablesForFS = (req, res, next) => {
  const {
    originProvider,
    originAccessId,
    originSecretKey,
    originAccountId,
    destinationProvider,
    destAccessId,
    destSecretKey,
    destAccountId,
  } = req.body;

  //Set the origin info.
  if (originProvider === "AWS") {
    res.locals.awsAccessId = originAccessId;
    res.locals.awsSecretKey = originSecretKey;
  } else if (originProvider === "Cloudflare") {
    res.locals.cloudflareAccessId = originAccessId;
    res.locals.cloudflareSecretKey = originSecretKey;
    res.locals.cloudflareAccountId = originAccountId;
  } else if (originProvider === "azureblob") {
    res.locals.azureBlobAccessId = originAccessId;
    res.locals.azureBlobSecretKey = originSecretKey;
  }
  //Set the destination info.
  if (destinationProvider === "AWS") {
    res.locals.awsAccessId = destAccessId;
    res.locals.awsSecretKey = destSecretKey;
  } else if (destinationProvider === "Cloudflare") {
    res.locals.cloudflareAccessId = destAccessId;
    res.locals.cloudflareSecretKey = destSecretKey;
    res.locals.cloudflareAccountId = destAccountId;
  } else if (destinationProvider === "azureblob") {
    res.locals.azureBlobAccessId = destAccessId;
    res.locals.azureBlobSecretKey = destSecretKey;
  }
  return next();
};

module.exports = { assignVariablesForFS, getBucketLoc };
