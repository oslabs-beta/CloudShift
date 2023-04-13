import { createAsyncThunk } from '@reduxjs/toolkit';

//Async thunk that handles data migration.
export const migrateData = createAsyncThunk(
  'GUI/migrateData',
  async (migrationData) => {
    const { origin, destination } = migrationData;
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
    //Do the migration.
    await fetch('/transfer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  }
);
