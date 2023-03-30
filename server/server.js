// const { S3Client, GetBucketLocationCommand, ListBucketsCommand, listRegions } = require("@aws-sdk/client-s3")
const AWS = require('aws-sdk')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')

/* Note: To supply the Multi-region Access Point (MRAP) to Bucket, you need to install the "@aws-sdk/signature-v4-crt" package to your project dependencies.
related links to getBucketLocation :
https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/classes/s3.html#getbucketlocation
https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/interfaces/getbucketlocationrequest.html

An alternative to trying to access the bucket locations is giving the use the availaale regions in their account:
https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-account/classes/listregionscommand.html
*/


const s3 = new AWS.S3({
  // region: 'us-east-1',
  aws_access_key_id: '',
  aws_secret_access_key: '',
});

const getBucketLoc = async () => {

  try {
    console.log('in bucket location')
    const data = await s3.getBucketLocation({ Bucket: 'test-bucket-my1' })
    const location = data.service.config.region
    console.log(`this is your location: ${location}`)
    console.log(data)
  }
  catch (err) {
    console.log('Error:', err)
  }
}

const getBucketLists = async () => {
  try {
    data = await s3.listBuckets()
    console.log('this is list Buckets data:', data)
  }
  catch (err) {
    console.log('Error:', err)
  }
}

// const s3client = new S3Client({
//   // region: 'us-east-1',
//   aws_access_key_id: 'AKIAUWWXQ6AIO65OFR74',
//   aws_secret_access_key: '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',
// })

// async function listRegions(){
//   try{
//     console.log('in listRegions')
//     const response = await s3client.send(new listRegions())
//   }
//   catch(error){

//   }
// }

// async function getBucketLocation(bucketName) {
/*command that is sent using client's credentials in this case getBucketLocation
Returns the Region the bucket resides in.
You set the bucket's Region using the LocationConstraint request parameter in a CreateBucket request.
*/

//   try {
//     console.log('in getBucketLocation')
//     // const response = await s3client.getBucketLocation(bucketName);
//     const response = await s3client.send(new GetBucketLocationCommand({ Bucket: bucketName }));
//     console.log('this is the response:', response)
//     console.log(`Bucket "${bucketName}" is in the "${location}" region.`);
//     return location;
//   } catch (error) {
//     console.error(`Error getting bucket location: ${error}`);
//     throw error;
//   }
// }

// async function listBuckets() {
//   /*command that is sent using client's credentials in this case getBucketLocation
//   Returns the Region the bucket resides in.
//   You set the bucket's Region using the LocationConstraint request parameter in a CreateBucket request.
//   */

//   try {
//     console.log('in listBuckets')
//     // const buckets = await s3client.listBuckets({});
//     const buckets = await s3client.send(new ListBucketsCommand())
//     console.log(`Available Buckets: ${buckets}`);
//     return buckets;
//   } catch (error) {
//     console.error(`Error getting buckets ${error}`);
//     throw error;
//   }
// }

// getBucketLocation('test-bucket-my1')
// listBuckets()
getBucketLoc()
getBucketLists()