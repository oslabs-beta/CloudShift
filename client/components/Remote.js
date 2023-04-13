//handle conditions if props.source is origin or destination

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BucketSelect from './BucketSelect';
import { getUserBuckets } from '../services/getBuckets';

const Remote = (props) => {
  return (
    <div><h1>{props.remoteType}: {props.displayName}</h1></div>
    //conditional rendering for fields based on service provider selected

    //Microsoft

    // accountID on the front === accessId on back (state)
    // accessKey on the from === secretKey on back (state)

    //AWS 
    
    //accessId
    //secretKey

    //Cloudflare

    //accessId
    //secretKey
    //accountId
  );
};

export default Remote;
