import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  email: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {
      const email = action.payload;
      state.isLogin = true;
      state.email = email;
    },
    REMOCE_ACTIVE_USER(state, action) {
      state.isLogin = false;
      state.email = null;
    },
  },
});

export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } = authSlice.actions;

export const selectIslogin = (state) => state.auth.isLogin;
export const selectEmail = (state) => state.auth.email;

export default authSlice.reducer;