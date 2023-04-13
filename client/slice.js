import { createSlice } from '@reduxjs/toolkit';
import { getUserBuckets } from './services/getBuckets';


const startingState = {
  isMigrating: false,
  origin: {
    name: '',
    accessId: '',
    secretKey: '',
    accountId: '',
    selectedBucket: '',
    service: '',
    bucketOptions: [],
    bucketLoading: false,
    errorMessage: ''
  },
  destination: {
    name: '',
    secretKey: '',
    accessId: '',
    accountId: '',
    selectedBucket: '',
    service: '',
    bucketOptions: [],
    bucketLoading: false,
    errorMessage: ''
  },
  socket: {
    isConnected: false,
    dataTransferProgressPercent: ''
  }
}




const slice = createSlice({
  name: 'GUI',
  initialState: {...startingState},
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
    updateOriginErrorMessage: (state, action) => {
      state.origin.errorMessage = action.payload.message;
    },
    updateDestinationErrorMessage: (state, action) => {
      state.destination.errorMessage = action.payload.message;
    },
    updateSocketConnectivity: (state, action) => {
      state.socket.isConnected = action.payload;
    },
    updateDataTransferProgressPercent: (state, action) => {
      state.socket.dataTransferProgressPercent = action.payload;
    },
    updateOriginBucketLoading: (state, action) => {
      state.origin.bucketLoading = action.payload;
    },
    updateDestinationBucketLoading: (state, action) => {
      state.destination.bucketLoading = action.payload;
    },
    clearOriginErrorMessage: (state, action) => {
      state.origin.errorMessage = '';
    },
    clearDestinationErrorMessage: (state, action) => {
      state.destination.errorMessage = ''
    },
    resetState: (state,action) => {
      return startingState
    },
    updateOriginName: (state,action) => {
      state.origin.name = action.payload
    }
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserBuckets.pending, (state, action) => {
        const { originOrDestination } = action.meta.arg;
        //Load the drop down and clear error message.
        if (originOrDestination === 'origin') {
          state.origin.errorMessage = '';
          state.origin.bucketLoading = true;
        } else {
          state.destination.errorMessage = '';
          state.destination.bucketLoading = true;
        }
      })
      .addCase(getUserBuckets.fulfilled, (state, action) => {
        const { data } = action.payload;
        const { originOrDestination } = action.meta.arg;
        //If server returned an error...
        if (!Array.isArray(data)) {
          if (originOrDestination === 'origin')
            state.origin.errorMessage = data;
          else state.destination.errorMessage = data;
        }
        //Update appropriate data.
        else {
          if (originOrDestination === 'origin') {
            state.origin.bucketOptions = data;
            state.origin.bucketLoading = false;
          } else {
            state.destination.bucketOptions = data;
            state.destination.bucketLoading = false;
          }
        }
        if (originOrDestination === 'origin') state.origin.bucketOptions = data;
        else if (originOrDestination === 'destination')
          state.destination.bucketOptions = data;
      })
      .addCase(getUserBuckets.rejected, (state, action) => {
        //Reset loading state.
        const { originOrDestination } = action.meta.arg;
        if (originOrDestination === 'origin')
          state.origin.bucketLoading = false;
        else state.destination.bucketLoading = false;
        //Post an error.
        state.errorMessage =
          'An unknown error occured. Please refresh and try again.';
      });
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
  updateOriginErrorMessage,
  updateDestinationErrorMessage,
  updateSocketConnectivity,
  updateDataTransferProgressPercent,
  updateOriginBucketLoading,
  updateDestinationBucketLoading,
  clearOriginErrorMessage,
  clearDestinationErrorMessage,
  resetState,
  updateOriginName
} = slice.actions;
