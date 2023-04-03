const { createAsyncThunk } = require('@reduxjs/toolkit');
const AWS = require('aws-sdk');

export const getUserBuckets = createAsyncThunk(
  'GUI/userBuckets',
  async (originOrDestination, { useSelector }) => {
    //Get the accessId and secretKey from store.
    let accessId, secretKey;
    if (originOrDestination === 'origin')
      ({ accessId, secretKey } = useSelector((state) => state.GUI.origin));
    else if (originOrDestination === 'destination')
      ({ accessId, secretKey } = useSelector((state) => state.GUI.destination));

    //Set the config file for retrieving buckets.
    AWS.config.update({
      accessKeyId: accessId,
      secretAccessKey: secretKey
    });
    const s3 = new AWS.S3();

    //Return the list of buckets, names only.
    //SEE WHAT HAPPENS IF THE BUCKET LIST IS EMPTY. DOES IT THROW AN ERROR OR NOT.
    //YOU CAN ERROR CHECK HERE TO SEE IF CREDENTIALS ARE INVALID!!!
    //YOU'LL PROBABLY WANT TO DO A LOT OF ERROR HANDLING HERE!!
    const data = await s3
      .listBuckets(function (err, data) {
        if (err) {
          console.log('Error', err);
        }
      })
      .promise();
    const buckets = data.Buckets.map((bucket) => bucket.Name);
    return { buckets, originOrDestination };
  }
);
