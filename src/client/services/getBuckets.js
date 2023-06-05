const { createAsyncThunk } = require("@reduxjs/toolkit");

//Async thunk to return a list of the buckets.
export const getUserBuckets = createAsyncThunk(
  "GUI/userBuckets",
  async (credentials) => {
    const body = JSON.stringify({
      accessId: credentials.accessId,
      secretKey: credentials.secretKey,
      serviceProvider: credentials.name,
      accountId: credentials.accountId,
    });
    //Send request...
    const res = await fetch("/listBuckets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    const data = await res.json();
    return { data };
  }
);
