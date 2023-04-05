import { createSlice } from '@reduxjs/toolkit';
import { getUserBuckets } from './services/getBuckets';

const slice = createSlice({
  name: 'GUI',
  initialState: {
    isMigrating: false,
    errState: '',
    origin: {
      name: '',
      accessId: '',
      secretKey: '',
      accountId: '',
      selectedBucket: '',
      service: '',
      bucketOptions: [],
    },
    destination: {
      name: '',
      secretKey: '',
      accessId: '',
      accountId: '',
      selectedBucket: '',
      service: '',
      bucketOptions: [],
    },
  },
  reducers: {
    migrationStatusChange: (state, action) => {
      state.isMigrating = action.payload;
    },
    updateDestinationBasedOnOrigin: (state, action) => {
      if (state.origin.name) state.destination = action.payload.destination;
    },
    updateDestinationCredentials: (state, action) => {
      state.destination = action.payload.destination;
    },
    updateOriginAccessId: (state, action) => {
      state.origin = action.payload.origin;
      state.destination = action.payload.destination;
    },
    updateOriginSecretKey: (state, action) => {
      state.origin = action.payload.origin;
    },
    updateDestinationAccessId: (state, action) => {
      state.destination = action.payload.destination;
    },
    updateDestinationSecretKey: (state, action) => {

      state.destination = action.payload.destination;
    },
    updateAccountId: (state, action) => {
      const { origin, destination } = action.payload;
      state.origin = origin;
      state.destination = destination;
    },
    updateOriginBuckets: (state, action) => {
      state.origin.bucketOptions = action.payload;
    },
    updateDestinationBuckets: (state, action) => {
      state.destination.bucketOptions = action.payload;
    },
    updateSelectedBucket: (state, action) => {
      state[action.payload.remote].selectedBucket = action.payload.bucket;
    },
    updateErrorState: (state, action) => {
      state.errState = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUserBuckets.fulfilled),
      (state, action) => {
        const { buckets, originOrDestination } = action.payload;
        if (originOrDestination === 'origin') state.origin.buckets = buckets;
        else if (originOrDestination === 'destination')
          state.destination.buckets = buckets;
      };
  }
});

export default slice.reducer;

export const {
  migrationStatusChange,
  updateRemoteCredentials,
  updateOriginAccessId,
  updateOriginSecretKey,
  updateDestinationSecretKey,
  updateDestinationAccessId,
  updateAccountId,
  updateOriginBuckets,
  updateDestinationBuckets,
  updateSelectedBucket,
  updateErrorState
} = slice.actions;
