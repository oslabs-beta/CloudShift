import React, { useEffect } from 'react';
import {
  updateDestinationAccessId,
  updateDestinationSecretKey,
  updateAccountId,
  updateDestinationBuckets,
} from '../slice';
import { useDispatch, useSelector } from 'react-redux';
import BucketSelect from './BucketSelect'

const Destination = (props) => {
  const dispatch = useDispatch();
  const { origin, destination } = useSelector((state) => state.GUI);

  let bucketSelect;

  const requireAccountId = props.name === 'CloudFlare' ? true : false;

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
    if (destination.accessId && destination.secretKey) {
      if (destination.name === 'CloudFlare' && !destination.accountId) return;
      (async () => {
        const res = await fetch('/listBuckets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            accessId: destination.accessId,
            secretKey: destination.secretKey,
            serviceProvider: destination.name,
            accountId: destination.accountId
          })
        });
        const data = await res.json();
        console.log('data2',data)
        dispatch(updateDestinationBuckets(data));
      })();
    }
  }, [destination.accessId, destination.secretKey, destination.name, destination.accountId]);

  return (
    <>
      <h1>Destination</h1>
      {props.name && (
        <h2>
          {props.name} {props.service}
        </h2>
      )}

      <div>
        {' '}
        <label htmlFor="accessId">Access Id:</label>
        {destination.accessId ? (
          <div>{'\u2705'}</div>
        ) : (
          <input
            name="accessId"
            onChange={(e) => {
              const newState = props.accessIdHandler(e, origin, destination);
              dispatch(updateDestinationAccessId(newState));
            }}
          ></input>
        )}
      </div>
      <div>
        {' '}
        <label htmlFor="secretKey">Secret Key:</label>
        {destination.secretKey ? (
          <div>{'\u2705'}</div>
        ) : (
          <input
            name="secretKey"
            onChange={(e) => {
              const newState = props.secretKeyHandler(e, origin, destination);
              dispatch(updateDestinationSecretKey(newState));
            }}
          ></input>
        )}
      </div>
      {props.name === 'CloudFlare' && (
        <div>
          {' '}
          <label htmlFor="accountId">Account Id:</label>
          <input
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
          {destination.accountId.length > 1 && <div>{'\u2705'}</div>}
        </div>
      )}
      {bucketSelect}
    </>
  );
};

export default Destination;
