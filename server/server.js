// const { S3Client, GetBucketLocationCommand, ListBucketsCommand, listRegions } = require("@aws-sdk/client-s3")
const AWS = require('aws-sdk');
const { debug } = require('console');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

/* Note: To supply the Multi-region Access Point (MRAP) to Bucket, you need to install the "@aws-sdk/signature-v4-crt" package to your project dependencies.
related links to getBucketLocation :
https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/classes/s3.html#getbucketlocation
https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/interfaces/getbucketlocationrequest.html

An alternative to trying to access the bucket locations is giving the use the availaale regions in their account:
https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-account/classes/listregionscommand.html
*/

AWS.config.update({
  //PUT ACCESS CREDENTIALS WITH CORRECT FORMAT HERE!
});
const s3 = new AWS.S3();

const getBucketLoc = async () => {
  try {
    console.log('in bucket location');
    const data = await s3
      .getBucketLocation({ Bucket: 'test-bucket-please-work-osp' })
      .promise();
    let location = data.LocationConstraint;
    //NEED TO RETURN US-EAST-1 IF STRING IS ''.
    if (location === '') location = 'us-east-1';
  } catch (err) {
    console.log('Error:', err);
  }
};

//Need error handling here.
const getBucketLists = async () => {
  const data = await s3
    .listBuckets(function (err, data) {
      if (err) {
        console.log('Error', err);
      }
    })
    .promise();
};
