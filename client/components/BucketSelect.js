import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateSelectedBucket } from '../slice';
import LoadingButton from './LoadingButton';

const BucketSelect = (props) => {
  const dispatch = useDispatch();
  const { bucketLoading, bucketOptions } = useSelector(
    (state) => state.GUI[props.remote]
  );
  const options = [];
  options.push(
    <option key={Date.now() + Math.random()} value="">
      Select Bucket
    </option>
  );
  bucketOptions.forEach((bucket) => {
    options.push(
      <option key={Date.now() + Math.random()} value={bucket}>
        {bucket}
      </option>
    );
  });
  return (
    <>
      {bucketLoading ? (
        <LoadingButton></LoadingButton>
      ) : (
        <div>
          <label htmlFor="buckets" className="text-xs scale-75">
            Choose a bucket:
          </label>
          <select
            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            name="buckets"
            onChange={(e) => {
              const payload = {
                bucket: e.target.value,
                remote: props.remote
              };
              dispatch(updateSelectedBucket(payload));
            }}
          >
            {options}
          </select>
        </div>
      )}
    </>
  );
};

export default BucketSelect;
