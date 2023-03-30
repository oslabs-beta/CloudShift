import React from 'react';
import {
  updateRemoteCredentials,
  checkInputCredentials,
  formatState,
} from '../slice';
import { useDispatch, useSelector } from 'react-redux';

const Origin = (props) => {
  const dispatch = useDispatch();
  const { origin, destination } = useSelector((state) => state.GUI);

  return (
    <>
      <h1>Origin</h1>
      {props.name && (
        <h2>
          {props.name} {props.service}
        </h2>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const accessId = e.target.accessId.value;
          const secretKey = e.target.secretKey.value;
          const accountId = e.target.accountId
            ? e.target.accountId.value
            : null;
          const results = checkInputCredentials(accessId, secretKey);
          if (!results) {
            console.log('Credentials appear to be incorrect');
          } else {
            const newState = formatState(
              results,
              accessId,
              secretKey,
              accountId,
              origin,
              destination
            );
            dispatch(updateRemoteCredentials(newState));
          }
        }}
      >
        <div>
          {' '}
          <label htmlFor="accessId">Access Id:</label>
          {origin.accessId && props.provider === 'Origin' ? (
            <p>'check'</p>
          ) : (
            <input name="accessId"></input>
          )}
        </div>
        <div>
          {' '}
          <label htmlFor="secretKey">Secret Key:</label>
          {origin.secretKey && props.provider === 'Origin' ? (
            <p>'check'</p>
          ) : (
            <input name="secretKey"></input>
          )}
        </div>
        {props.name === 'CloudFlare' && (
          <div>
            {' '}
            <label htmlFor="accountId">Account Id:</label>
            <input name="accountId"></input>
          </div>
        )}

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Origin;
