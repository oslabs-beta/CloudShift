import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'test',
  initialState: {
    log: null,
  },
  reducers: {
    saveLogToState: (state, action) => {
      state.log = action.payload;
    },
  },
});

export default slice.reducer;

export const { saveLogToState } = slice.actions;

export const loggingMyStuff = (val) => {
  console.log(val);
};
