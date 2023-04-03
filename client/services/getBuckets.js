const { createAsyncThunk } = require('@reduxjs/toolkit');
const AWS = require('aws-sdk');

//CAN REFACTOR DOWN TO RTK-QUERY.

export const getUserBuckets = createAsyncThunk(
  'GUI/userBuckets',
  async ({ originOrDestination, accessId, secretKey }) => {
    try {
      //Set the config file for retrieving buckets.
      AWS.config.update({
        accessKeyId: accessId,
        secretAccessKey: secretKey
      });
      const s3 = new AWS.S3();
      s3.cors;

      //Return the list of buckets, names only.
      //SEE WHAT HAPPENS IF THE BUCKET LIST IS EMPTY. DOES IT THROW AN ERROR OR NOT.
      //YOU CAN ERROR CHECK HERE TO SEE IF CREDENTIALS ARE INVALID!!!
      //YOU'LL PROBABLY WANT TO DO A LOT OF ERROR HANDLING HERE!!
      const data = await s3.listBuckets().promise();
      const buckets = data.Buckets.map((bucket) => bucket.Name);
      //console.log('DATA', data);
      return { buckets, originOrDestination };
    } catch (e) {
      console.log(e);
    }
  }
);
