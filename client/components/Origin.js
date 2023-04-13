import React, { useEffect } from 'react';
import {
  updateOriginSecretKey,
  updateOriginAccessId,
  updateAccountId
} from '../slice';
import { useDispatch, useSelector } from 'react-redux';
import { getUserBuckets } from '../services/getBuckets';
import BucketSelect from './BucketSelect';
import aws_edited from '../public/aws_edited.png';
import cloudflare_edited from '../public/cloudflare_edited.png';
import ErrorComponent from './ErrorComponent';

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

  //Get the list of buckets if all credentials are present.
  useEffect(() => {
    if (!origin.accessId || !origin.secretKey) return;
    if (origin.name === 'Cloudflare' && !origin.accountId) return;
    dispatch(getUserBuckets({ ...origin, originOrDestination: 'origin' }));
  }, [origin.accessId, origin.secretKey, origin.name, origin.accountId]);

  return (
    <div>
      <div className="relative z-0 w-full h-full mb-6 group">
        <div class="grid grid-cols-3 gap-2">
          <div class="mx-auto text-sm flex items-center font-mono">
            Origin
            {props.name && (
              <>
                : {props.name} {props.service}
              </>
            )}
          </div>
          <div>
            <img
              class={`flex items-center mx-auto object-scale-down h-8 w-8 ${
                props.name === 'Cloudflare' ? '' : 'grayscale'
              }`}
              // src={props.name === 'AWS' ? aws_edited : cloudflare_edited}
              src={cloudflare_edited}
            />
          </div>

          <div>
            <img
              class={`flex items-center mx-auto object-scale-down h-8 w-8 ${
                props.name === 'AWS' ? '' : 'grayscale'
              }`}
              // src={props.name === 'AWS' ? aws_edited : cloudflare_edited}
              src={aws_edited}
            />
          </div>
        </div>
      </div>

      <div className="relative z-0 w-full h-full mb-6 group">
        <input
          type="key"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-800 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
          htmlFor="originAccessId"
          className="peer-focus:font-medium absolute text-base duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Access ID{origin.accessId ? <>{' \u2705'}</> : <></>}
        </label>
      </div>

      <div className="block relative z-0 w-full h-full mb-6 group">
        <input
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-800 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
          className="peer-focus:font-medium absolute text-base duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Secret Key{origin.secretKey ? <>{' \u2705'}</> : <></>}
        </label>
      </div>

      {props.name === 'Cloudflare' && (
        <div className="relative z-0 w-full h-full mb-6 group">
          <input
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-800 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
            htmlFor="accountId"
            className="peer-focus:font-medium absolute text-base duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Account ID {origin.accountId.length > 1 && <>{'\u2705'}</>}
          </label>
        </div>
      )}

      {origin.errorMessage ? (
        <ErrorComponent></ErrorComponent>
      ) : (
        <div className="relative z-0 w-full h-full mb-6 group">
          {bucketSelect}
        </div>
      )}
    </div>
  );
};

export default Origin;
