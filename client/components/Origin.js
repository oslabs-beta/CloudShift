import React, { useEffect } from 'react';
import {
  updateOriginSecretKey,
  updateOriginAccessId,
  updateAccountId,
  updateOriginBuckets
} from '../slice';
import { useDispatch, useSelector } from 'react-redux';
import { getUserBuckets } from '../services/getBuckets';
import BucketSelect from './BucketSelect';

const Origin = (props) => {
  const dispatch = useDispatch();
  const { origin, destination } = useSelector((state) => state.GUI);

  let bucketSelect;
  const requireAccountId = props.name === 'Cloudflare' ? true : false;
  if (!requireAccountId) {
    bucketSelect = origin.accessId && origin.secretKey && (
      <BucketSelect remote={'origin'}></BucketSelect>
    );
  } else {
    bucketSelect = origin.accessId && origin.secretKey && origin.accountId && (
      <BucketSelect remote={'origin'}></BucketSelect>
    );
  }

  //REFACTOR TO RTK QUERY.
  //THIS GETS THE BUCKETS.
  useEffect(() => {
    if (origin.accessId && origin.secretKey) {
      if (origin.name === 'Cloudflare' && !origin.accountId) return;
      (async () => {
        const res = await fetch('/listBuckets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            accessId: origin.accessId,
            secretKey: origin.secretKey,
            serviceProvider: origin.name,
            accountId: origin.accountId
          })
        });
        const data = await res.json();
        dispatch(updateOriginBuckets(data));
      })();
    }
  }, [origin.accessId, origin.secretKey, origin.name, origin.accountId]);

  return (
    <>
      <div>
        <div class="relative z-0 w-4/5 mb-6 group text-center text-lg">
          Origin
          {props.name && (
            <>
              : {props.name} {props.service}
            </>
          )}
        </div>

        <div class="relative z-0 w-4/5 mb-6 group">
          <input
            type="key"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-800 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            name="accessId"
            id="originAccessId"
            onChange={(e) => {
              const newState = props.originAccessIdHandler(
                e,
                origin,
                destination
              );
              dispatch(updateOriginAccessId(newState));
            }}
          ></input>
          <label
            htmlFor="accessId"
            for="originAccessId"
            class="peer-focus:font-medium absolute text-base duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Access ID{origin.accessId ? <>{' \u2705'}</> : <></>}
          </label>
        </div>

        <div class="block relative z-0 w-4/5 mb-6 group">
          <input
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-800 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            type="key"
            name="secretKey"
            id="originSecretKey"
            onChange={(e) => {
              const newState = props.secretKeyHandler(e, origin);
              dispatch(updateOriginSecretKey(newState));
            }}
          ></input>

          <label
            htmlFor="secretKey"
            for="secretKey"
            class="peer-focus:font-medium absolute text-base duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Secret Key{origin.secretKey ? <>{' \u2705'}</> : <></>}
          </label>
        </div>

        {props.name === 'Cloudflare' && (
          <div class="relative z-0 w-4/5 mb-6 group">
            <input
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-800 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              type="id"
              id="accountId"
              name="accountId"
              onChange={(e) => {
                const newState = props.accountIdHandler(
                  e,
                  origin,
                  destination,
                  props.remoteType
                );
                dispatch(updateAccountId(newState));
              }}
            ></input>
            <label
              for="accountId"
              class="peer-focus:font-medium absolute text-base duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Account ID {origin.accountId.length > 1 && <>{'\u2705'}</>}
            </label>
          </div>
        )}
        <div class="relative z-0 w-4/5 mb-6 group">{bucketSelect}</div>
      </div>
    </>
  );
};

export default Origin;
