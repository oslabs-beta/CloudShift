import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'GUI',
  initialState: {
    isMigrating: false,
    origin: {
      name: '',
      accessId: '',
      secretKey: '',
      accountId: '',
      service: '',
    },
    destination: {
      render: false,
      name: '',
      secretKey: '',
      accessId: '',
      accountId: '',
      service: '',
    },
  },
  reducers: {
    migrationStatusChange: (state, action) => {
      state.isMigrating = action.payload;
    },
    updateRemoteCredentials: (state, action) => {
      state.origin = action.payload.origin;
      state.destination = action.payload.destination;
    },
  },
});

export default slice.reducer;

export const { migrationStatusChange, updateRemoteCredentials } = slice.actions;

export const checkInputCredentials = (accessId, secretKey) => {
  const isAmazonAccessId = /(?<![A-Z0-9])[A-Z0-9]{20}(?![A-Z0-9])/.test(
    accessId
  );
  const isAmazonSecretKey =
    /(?<![A-Za-z0-9/+=])[A-Za-z0-9/+=]{40}(?![A-Za-z0-9/+=])/.test(secretKey);

  const isCloudflareAccessId = /^[a-z0-9]{32}$/.test(accessId);
  const isCloudflareSecretKey = /^[a-z0-9]{64}$/.test(secretKey);
  if (isAmazonAccessId && isAmazonSecretKey) {
    return 'Amazon';
  } else if (isCloudflareAccessId && isCloudflareSecretKey) {
    return 'CloudFlare';
  } else {
    return false;
  }
};

//modify data for state with a func?...

export const formatState = (
  input,
  accessId,
  secretKey,
  accountId,
  currentOrigin,
  currentDestination
) => {
  if (currentOrigin.name) {
    const updatedDestination = Object.assign({}, currentDestination);
    updatedDestination.accessId = accessId;
    updatedDestination.secretKey = secretKey;
    updatedDestination.accountId = accountId;
    return { origin: {...currentOrigin}, destination: {...updatedDestination} };
  }
  if (input === 'Amazon') {
    return {
      origin: {
        name: input,
        accessId: accessId,
        secretKey: secretKey,
        accountId: null,
        service: 'S3',
      },
      destination: {
        render: true,
        name: 'CloudFlare',
        secretKey: null,
        accessId: null,
        accountId: null,
        service: 'R2',
      },
    };
  } else {
    return {
      origin: {
        name: 'CloudFlare',
        accessId: accessId,
        secretKey: secretKey,
        accountId: null,
        service: 'R2',
      },
      destination: {
        render: true,
        name: input,
        secretKey: null,
        accessId: null,
        accountId: null,
        service: 'S3',
      },
    };
  }
};

//update destination.render
//populate destination name with cf and render accountId field
//amazon populate service field in state and render on page
//populate name field and render on page
