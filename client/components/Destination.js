import React, { useEffect } from 'react';
import {
  updateDestinationAccessId,
  updateDestinationSecretKey,
  updateAccountId
} from '../slice';
import { getUserBuckets } from '../services/getBuckets';
import { useDispatch, useSelector } from 'react-redux';
import BucketSelect from './BucketSelect';
import aws_edited from '../public/aws_edited.png';
import cloudflare_edited from '../public/cloudflare_edited.png';
import MigrationButton from './MigrationButton';
import ErrorComponent from './ErrorComponent';

const Destination = (props) => {
  const dispatch = useDispatch();
  const { origin, destination } = useSelector((state) => state.GUI);

  let bucketSelect;

  const requireAccountId = props.name === 'Cloudflare' ? true : false;

  if (!requireAccountId) {
    bucketSelect = destination.accessId && destination.secretKey && (
      <BucketSelect remote={'destination'}></BucketSelect>
    );
  } else {
    bucketSelect = destination.accessId &&
      destination.secretKey &&
      destination.accountId && (
        <BucketSelect remote={'destination'}></BucketSelect>
      );
  }

  useEffect(() => {
    if (!destination.accessId || !destination.secretKey) return;
    if (destination.name === 'Cloudflare' && !destination.accountId) return;
    dispatch(
      getUserBuckets({ ...destination, originOrDestination: 'destination' })
    );
  }, [
    destination.accessId,
    destination.secretKey,
    destination.name,
    destination.accountId
  ]);

  return (
    <div>
      <div className="flex flex-col justify-items-center items-center relative z-0 w-4/5 mb-6 group text-center text-lg">
        {!props.name ? null : (
          <img
            src={props.name === 'AWS' ? aws_edited : cloudflare_edited}
          ></img>
        )}
        Destination
        {props.name && (
          <>
            : {props.name} {props.service}
          </>
        )}
      </div>

      <div className="relative z-0 w-4/5 mb-6 group">
        <input
          type="key"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-800 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          name="destAccessId"
          id="destinationAccessId"
          onChange={(e) => {
            const newState = props.accessIdHandler(e, origin, destination);
            dispatch(updateDestinationAccessId(newState));
          }}
        ></input>
        <label
          htmlFor="destAccessId"
          className="peer-focus:font-medium absolute text-base duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Access ID{destination.accessId ? <>{' \u2705'}</> : <></>}
        </label>
      </div>

      <div className="block relative z-0 w-4/5 mb-6 group">
        <input
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-800 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          type="key"
          name="destSecretKey"
          id="destSecretKey"
          onChange={(e) => {
            const newState = props.secretKeyHandler(e, origin, destination);
            dispatch(updateDestinationSecretKey(newState));
          }}
        ></input>

        <label
          htmlFor="destSecretKey"
          className="peer-focus:font-medium absolute text-base duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Secret Key{destination.secretKey ? <>{' \u2705'}</> : <></>}
        </label>
      </div>

      {props.name === 'Cloudflare' && (
        <div className="relative z-0 w-4/5 mb-6 group">
          <input
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-800 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            type="id"
            id="destAccountId"
            name="destAccountId"
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
            htmlFor="destAccountId"
            className="peer-focus:font-medium absolute text-base duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Account ID {destination.accountId.length > 1 && <>{'\u2705'}</>}
          </label>
        </div>
      )}

      {destination.errorMessage ? (
        <ErrorComponent></ErrorComponent>
      ) : (
        <div className="relative z-0 w-4/5 mb-6 group">{bucketSelect}</div>
      )}

      <div className="relative z-0 w-4/5 mb-6 group">
        {origin.selectedBucket && destination.selectedBucket && (
          <MigrationButton></MigrationButton>
        )}
      </div>
    </div>
  );
};

export default Destination;
