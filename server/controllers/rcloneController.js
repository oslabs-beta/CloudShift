const rclone = require("rclone.js");
const { resolve } = require("path");
const errorGenerator = require("../services/errorGenerator");

const rCloneCopyController = (req, res, next) => {
  // Build the strings for rClone to do the copying.
  const {
    originProvider,
    destinationProvider,
    originBucket,
    destinationBucket,
  } = req.body;

  //CloudShift currently does not support same origin and destination transfer.
  if (originProvider === destinationProvider)
    return next({
      log: "Error in rcloneListBuckets middleware.",
      message:
        "CloudShift currently does not support same origin/desintation provider transfer.",
    });

  const originString = `${originProvider.toLowerCase()}:${originBucket.toLowerCase()}`;
  const destinationString = `${destinationProvider.toLowerCase()}:${destinationBucket.toLowerCase()}`;

  try {
    res.locals.rcloneCopy = rclone("copy", originString, destinationString, {
      env: {
        RCLONE_CONFIG: resolve(__dirname, "../../rclone.conf"),
      },
      progress: true,
    });

    return next();
  } catch (e) {
    return next({
      log: `Unkown error:, ${err}`,
      message: "Unknown error during rcloneCopy process.",
    });
  }
};

const rcloneListBuckets = async (req, res, next) => {
  const { accessId, secretKey, serviceProvider, accountId } = req.body;
  //Make sure all required parameters exist on the req.body.
  if (!accessId || !secretKey || !serviceProvider)
    return next({
      log: "Error in rcloneListBuckets middleware.",
      message:
        "Must POST a Service Provider, Access ID, Secret Key, and an Account ID.",
    });
  //Cloudflare specific required parameters.
  if (serviceProvider === "Cloudflare" && !accountId)
    return next({
      log: "Error in rcloneListBuckets middleware.",
      message: "Must POST an Account ID when using Cloudflare.",
    });

  try {
    let data, buckets;
    //Update the AWS config file with correct credentials depending on the service.
    if (serviceProvider === "AWS" || serviceProvider === "Cloudflare") {
      const AWS = require("aws-sdk");
      if (serviceProvider === "AWS") {
        AWS.config.update({
          accessKeyId: accessId,
          secretAccessKey: secretKey,
        });
      } else if (serviceProvider === "Cloudflare") {
        AWS.config.update({
          accessKeyId: accessId,
          secretAccessKey: secretKey,
          signatureVersion: "v4",
          endpoint: `https://${accountId}.r2.cloudflarestorage.com/`,
        });
      }

      const s3 = new AWS.S3();

      //Return the list of buckets, names only.
      data = await s3.listBuckets().promise();
      //Translate the bucket array data into an array of bucket string names.
      buckets = data.Buckets.map((bucket) => bucket.Name);
    }
    //Handle the Microsoft Azure case.
    else if (serviceProvider === "azureblob") {
      //Import necessary classes from azure library.
      const {
        BlobServiceClient,
        StorageSharedKeyCredential,
      } = require("@azure/storage-blob");
      //Pass credentials to Azure sdk library.
      const sharedKeyCredential = new StorageSharedKeyCredential(
        accessId,
        secretKey
      );
      const blobServiceClient = new BlobServiceClient(
        `https://${accessId}.blob.core.windows.net`,
        sharedKeyCredential
      );

      //Return the list of buckets, names only.
      data = blobServiceClient.listContainers();
      buckets = [];
      for await (const container of data) {
        buckets.push(container.name);
      }
    }

    //Throw an error if there are no buckets associated with
    if (!buckets.length)
      return next({
        message: `There are no buckets associated with your ${serviceProvider} account.`,
      });
    res.locals.buckets = buckets;
    return next();
  } catch (error) {
    const { message, field } = errorGenerator(error, serviceProvider);
    return next({
      log: error.message,
      message,
      field,
    });
  }
};

module.exports = { rCloneCopyController, rcloneListBuckets };
