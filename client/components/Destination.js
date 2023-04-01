import React from 'react';
import {
  updateDestinationAccessId,
  updateDestinationSecretKey,
  updateAccountId,
} from '../slice';
import { useDispatch, useSelector } from 'react-redux';

const Destination = (props) => {
  const dispatch = useDispatch();
  const { origin, destination } = useSelector((state) => state.GUI);

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
    </>
  );
};

export default Destination;
