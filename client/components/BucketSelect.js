import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateSelectedBucket } from '../slice';

const BucketSelect = (props) => {
  const dispatch = useDispatch();
  console.log('remote',props.remote)
  const { bucketOptions } = useSelector((state) => state.GUI[props.remote]);
  console.log('bucketOptions',bucketOptions)
  const options = [];
  options.push(<option value="">Select Bucket</option>);
  bucketOptions.forEach((bucket) => {
    options.push(
      <option key={bucket} value={bucket}>
        {bucket}
      </option>
    );
  });
  return (
    <>
      <label htmlFor="buckets"
        for="buckets"
        class='text-xs scale-75'
      >Choose a bucket:</label>
      <select
        class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
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
