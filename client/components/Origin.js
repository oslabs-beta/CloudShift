import React, { useEffect } from 'react';
import {
  updateOriginSecretKey,
  updateOriginAccessId,
  updateAccountId,
  updateOriginBuckets
} from '../slice';
import { useDispatch, useSelector } from 'react-redux';
import { getUserBuckets } from '../services/getBuckets';

const Origin = (props) => {
  const dispatch = useDispatch();
  const { origin, destination } = useSelector((state) => state.GUI);

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
            secretKey: origin.secretKey
          })
        });
        const data = await res.json();
        dispatch(updateOriginBuckets(data));
      })();
    }
  }, [origin.accessId, origin.secretKey, origin.name, origin.accountId]);

  return (
    <>
      <h1>Origin</h1>
      {props.name && (
        <h2>
          {props.name} {props.service}
        </h2>
      )}
      <div>
        {' '}
        <label htmlFor="accessId">Access Id:</label>
        {origin.accessId ? (
          <div>{'\u2705'}</div>
        ) : (
          <input
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
        )}
      </div>
      <div>
        {' '}
        <label htmlFor="secretKey">Secret Key:</label>
        {origin.secretKey ? (
          <div>{'\u2705'}</div>
        ) : (
          <input
            name="secretKey"
            id="originSecretKey"
            onChange={(e) => {
              const newState = props.secretKeyHandler(e, origin);
              dispatch(updateOriginSecretKey(newState));
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
          {origin.accountId.length > 1 && <div>{'\u2705'}</div>}
        </div>
      )}
    </>
  );
};

export default Origin;
