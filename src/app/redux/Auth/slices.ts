import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    actionLogin: (state, action) => {
      state.password = action.payload.password;
      state.email = action.payload.email;
    },
  },
});

export const { actionLogin } = authSlice.actions;

export default authSlice.reducer;
