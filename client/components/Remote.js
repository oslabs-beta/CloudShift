import React from 'react';

const Remote = (props) => {
  return (
    <>
      <h1>{props.provider}</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e.target.accessId.value, e.target.secretKey.value);
          // CF: ^[a-z0-9]{32}$ -- Access ID
          // CF: ^[a-z0-9]{64}$ -- Secret Pass
          // AKID: (?<![A-Z0-9])[A-Z0-9]{20}(?![A-Z0-9])
          // SK: (?<![A-Za-z0-9/+=])[A-Za-z0-9/+=]{40}(?![A-Za-z0-9/+=])
        }} 
      >
        <div>
          {' '}
          <label htmlFor="accessId">Access Id:</label>
          <input name="accessId"></input>
        </div>
        <div>
          {' '}
          <label htmlFor="secretKey">Secret Key:</label>
          <input name="secretKey"></input>
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Remote;
