import React, { useEffect } from 'react';
import { updateSecretKey, updateAccessId, updateAccountId } from '../slice';
import { useDispatch, useSelector } from 'react-redux';
import BucketSelect from './BucketSelect';
import { getUserBuckets } from '../services/getBuckets';
import aws_edited from '../public/aws_edited.png';
import cloudflare_edited from '../public/cloudflare_edited.png';
import ErrorDisplay from './ErrorDisplay';

const Remote = (props) => {
  const dispatch = useDispatch();
  const { origin, destination } = useSelector((state) => state.GUI);

  let { remoteType } = props;

  const remote = remoteType === 'origin' ? origin : destination;

  let bucketSelect;

  const requireAccountId = remote.name === 'Cloudflare' ? true : false;

  if (!requireAccountId) {
    bucketSelect = remote.accessId && remote.secretKey && (
      <BucketSelect remote={remoteType}></BucketSelect>
    );
  } else {
    bucketSelect = remote.accessId && remote.secretKey && remote.accountId && (
      <BucketSelect remote={remoteType}></BucketSelect>
    );
  }

  //Get the list of buckets if all credentials are present.
  useEffect(() => {
    if (!remote.accessId || !remote.secretKey) return;
    if (remote.name === 'Cloudflare' && !remote.accountId) return;
    dispatch(getUserBuckets({ ...remote, originOrDestination: remoteType }));
  }, [remote.accessId, remote.secretKey, remote.name, remote.accountId]);

  return (
    <div>
      <div className="relative z-0 w-full h-full mb-6 group">
        <div class="grid grid-cols-3 gap-2">
          <h1 class="mx-auto text-sm flex items-center font-mono">
            {props.remoteType.charAt(0).toUpperCase()
  + props.remoteType.slice(1)}: {props.displayName}
          </h1>
          {/* <div>
            <img
              class={`flex items-center mx-auto object-scale-down h-8 w-8 ${
                props.name === 'Cloudflare' ? '' : 'grayscale'
              }`}
              // src={props.name === 'AWS' ? aws_edited : cloudflare_edited}
              src={cloudflare_edited}
            />
          </div> */}

          {/* <div>
            <img
              class={`flex items-center mx-auto object-scale-down h-8 w-8 ${
                props.name === 'AWS' ? '' : 'grayscale'
              }`}
              // src={props.name === 'AWS' ? aws_edited : cloudflare_edited}
              src={aws_edited}
            />
          </div> */}
        </div>
      </div>

      <div className="relative z-0 w-full h-full mb-6 group">
        <input
          type="key"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-800 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          name="accessId"
          id={`${remoteType}AccessId`}
          onChange={(e) => {
            const newState = props.accessIdHandler(e, remote);
            dispatch(updateAccessId({ newState, remoteType }));
          }}
        ></input>
        <label
          htmlFor={`${remoteType}AccessId`}
          className="peer-focus:font-medium absolute text-base duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          {remote.name === 'azureblob' ? 'Account ID' : 'Access ID'}
          {remote.accessId ? <>{' \u2705'}</> : <></>}
        </label>
      </div>

      <div className="block relative z-0 w-full h-full mb-6 group">
        <input
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-800 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          type="key"
          name="secretKey"
          id={`${remote}SecretKey`}
          onChange={(e) => {
            const newState = props.secretKeyHandler(e, remote);
            dispatch(updateSecretKey({ newState, remoteType }));
          }}
        ></input>

        <label
          htmlFor="secretKey"
          className="peer-focus:font-medium absolute text-base duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          {remote.name === 'azureblob' ? 'Access Key' : 'Secret Key'}
          {remote.secretKey ? <>{' \u2705'}</> : <></>}
        </label>
      </div>

      {remote.name === 'Cloudflare' && (
        <div className="relative z-0 w-full h-full mb-6 group">
          <input
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-800 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            type="id"
            id="accountId"
            name="accountId"
            onChange={(e) => {
              dispatch(
                updateAccountId({
                  accountId: e.target.value.trim(),
                  remoteType,
                })
              );
            }}
          ></input>
          <label
            htmlFor="accountId"
            className="peer-focus:font-medium absolute text-base duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Account ID {remote.accountId.length > 1 && <>{'\u2705'}</>}
          </label>
        </div>
      )}

      {remote.errorMessage ? (
        <ErrorDisplay></ErrorDisplay>
      ) : (
        <div className="relative z-0 w-full h-full mb-6 group">
          {bucketSelect}
        </div>
      )}
    </div>
  );
};

export default Remote;
