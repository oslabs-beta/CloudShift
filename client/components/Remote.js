//handle conditions if props.source is origin or destination

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BucketSelect from './BucketSelect';
import { getUserBuckets } from '../services/getBuckets';

const Remote = (props) => {

    const source = props.source
    console.log('source',source)
    return (

        <div>HI</div>
    )

}


export default Remote