import { configureStore } from '@reduxjs/toolkit';
import GUI from './slice'

const store = configureStore({
  reducer: {
    GUI,
  },
});
export default store;
