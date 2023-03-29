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
      secretKey: 'asdf',
      accessId: 'asdf',
      accountId: '',
      service: '',
    },
  },
  reducers: {
    migrationStatusChange: (state, action) => {
      state.isMigrating = action.payload;
    },
    captureOriginCredentials: (state, action) => {
      state.origin.accessId = action.accessId;
      state.origin.secretKey = action.secretKey;
    },
  },
});

export default slice.reducer;

export const { migrationStatusChange, captureOriginCredentials } =
  slice.actions;

//     AWS: Access ID, Secret Key, and "Service" aka S3

// 12:27
// CF: Access Id, Secret Key, and Account ID
