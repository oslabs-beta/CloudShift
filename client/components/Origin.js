import React from 'react';
import {
  updateOriginSecretKey,
  updateOriginAccessId,
} from '../slice';
import { useDispatch, useSelector } from 'react-redux';

const Origin = (props) => {
  const dispatch = useDispatch();
  const { origin, destination } = useSelector((state) => state.GUI);

  return (
    <form>
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
              const newState = props.originAccessIdHandler(e, origin, destination);
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
          {origin.accountId ? (
            <div>{'\u2705'}</div>
          ) : (
            <input
              name="accountId"
              id="originAccountId"
              onChange={(e) => {
                const newState = props.accountIdHandler(e, origin, destination);
                dispatch(updateAccountId(newState));
              }}
            ></input>
          )}
        </div>
      )}
    </section>
  );
};

export default Origin;
