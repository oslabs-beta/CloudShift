import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateSelectedBucket } from '../slice';

const BucketSelect = (props) => {
  const dispatch = useDispatch();
  const { bucketOptions } = useSelector((state) => state.GUI[props.remote]);
  const options = [];
  options.push(<option value="">--Please choose a bucket--</option>);
  bucketOptions.forEach((bucket) => {
    options.push(
      <option key={bucket} value={bucket}>
        {bucket}
      </option>
    );
  });
  return (
    <>
      {' '}
      <label htmlFor="buckets">Choose a bucket:</label>
      <select
        name="buckets"
        onChange={(e) => {
          const payload = {
            bucket: e.target.value,
            remote: props.remote,
          };
          dispatch(updateSelectedBucket(payload));
        }}
      >
        {options}
      </select>
    </>
  );
};

export default BucketSelect;
