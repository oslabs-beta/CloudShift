import React from 'react';
import {
  updateDestinationAccessId,
  updateDestinationSecretKey,
  accountIdHandler
} from '../slice';
import { useDispatch, useSelector } from 'react-redux';

const Destination = (props) => {
  const dispatch = useDispatch();
  const { destination } = useSelector((state) => state.GUI);

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
              const newState = props.accessIdHandler(e, destination);
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
              const newState = props.secretKeyHandler(e, destination);
              dispatch(updateDestinationSecretKey(newState));
            }}
          ></input>
        )}
      </div>
      {props.name === 'CloudFlare' && (
        <div>
          {' '}
          <label htmlFor="accountId">Account Id:</label>
          {destination.accountId ? (
            <div>{'\u2705'}</div>
          ) : (
            <input name="accountId"></input>
          )}
        </div>
      )}

      {!destination.accessId && !destination.secretKey && (
        <button type="submit">Submit</button>
      )}
    </>
  );
};

export default Destination;
