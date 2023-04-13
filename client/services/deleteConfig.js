import { createAsyncThunk } from "@reduxjs/toolkit";

//Async thunk that handles data migration.
export const deleteConfig = createAsyncThunk("GUI/deleteBucket", async () => {
  //Delete the bucket.
  await fetch("/removeConfig");
});
