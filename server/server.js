// // const { S3Client, GetBucketLocationCommand, ListBucketsCommand, listRegions } = require("@aws-sdk/client-s3")
// const AWS = require('aws-sdk');
// const { debug } = require('console');
// const fs = require('fs');
// const { v4: uuidv4 } = require('uuid');

// /* Note: To supply the Multi-region Access Point (MRAP) to Bucket, you need to install the "@aws-sdk/signature-v4-crt" package to your project dependencies.
// related links to getBucketLocation :
// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/classes/s3.html#getbucketlocation
// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/interfaces/getbucketlocationrequest.html

// An alternative to trying to access the bucket locations is giving the use the availaale regions in their account:
// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-account/classes/listregionscommand.html
// */

// AWS.config.update({
//   accessKeyId: 'AKIAUBWLANRIRWTZGEX6',
//   secretAccessKey: '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'
// });
// const s3 = new AWS.S3();

// const getBucketLoc = async () => {
//   try {
//     console.log('in bucket location');
//     const data = await s3
//       .getBucketLocation({ Bucket: 'test-bucket-please-work-osp' })
//       .promise();
//     let location = data.LocationConstraint;
//     //NEED TO RETURN US-EAST-1 IF STRING IS ''.
//     if (location === '') location = 'us-east-1';
//   } catch (err) {
//     console.log('Error:', err);
//   }
// };

// //Need error handling here.
// const getBucketLists = async () => {
//   const data = await s3.listBuckets().promise();
//   //data.Buckets is an array of objects.
//   //for each object, you want the .Name property.
//   return data.Buckets.map((bucket) => console.log(bucket.Name));
// };

// getBucketLists();

// module.exports = { getBucketLoc, getBucketLists };

const path = require('path');
const express = require('express');
const fsController = require('./controllers/fsController.js');
const {
  rcloneCopy,
  rcloneListBuckets
} = require('./controllers/rcloneController');

const app = express();

//PUT ALL THE WEBSOCKET HERE FOR NOW.

app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../client/public')));

//Don't think we need this.
// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../client/index.html'));
// });

app.post('/listBuckets', rcloneListBuckets, (req, res) => {
  res.status(200).json(res.locals.buckets);
});

app.post('/transfer', fsController.config, (req, res) => {
  res.sendStatus(200);
});

//404 NEEDED

//GLOBAL ERROR HANDLER NEEDED.
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' }
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(3000, () => console.log('Serving listening on port 3000...'));
