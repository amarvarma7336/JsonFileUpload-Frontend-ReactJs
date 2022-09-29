import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
  },
  reducers: {
    setUserLogin: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
  },
});

export const { setUserLogin } = authSlice.actions;

export default authSlice.reducer;
