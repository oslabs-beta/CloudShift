import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { migrationStatusChange } from '../slice.js';

const StartMigrationButton = () => {
  const dispatch = useDispatch();
  const changeMigrationStatus = () => {
    dispatch(migrationStatusChange(true));
  };
  const { origin, destination, isMigrating } = useSelector(
    (state) => state.GUI
  );

  //Run migration logic.
  //SHOULD HAVE LOGIC FOR MAKING SURE ALL STATE IS HERE BEFORE YOU ACTUALLY RUN THE MIGRATION.
  useEffect(() => {
    if (!isMigrating) return;
    //Create the request body.
    const body = {
      originProvider: origin.name === 'AWS' ? 'AWS' : origin.name,
      originAccessId: origin.accessId,
      originSecretKey: origin.secretKey,
      originAccountId: origin.accountId,
      originBucket: origin.selectedBucket,
      destinationProvider:
        destination.name === 'AWS' ? 'AWS' : destination.name,
      destAccessId: destination.accessId,
      destSecretKey: destination.secretKey,
      destAccountId: destination.accountId,
      destinationBucket: destination.selectedBucket
    };
    console.log(body);
    //Do the migration.
    (async () => {
      await fetch('/transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      dispatch(migrationStatusChange(false));
    })();
  }, [isMigrating]);

  return (
    <button onClick={() => changeMigrationStatus()}>Start Migration</button>
  );
};

export default StartMigrationButton;
