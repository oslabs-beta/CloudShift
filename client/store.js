import { configureStore } from '@reduxjs/toolkit';
import test from './testSlice';
import GUI from './slice'

const store = configureStore({
  reducer: {
    test,
    GUI,
  },
});
export default store;
