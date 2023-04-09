import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  email: null,
  useName: null,
  userID: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {
      const { email, userName, userID } = action.payload;
      state.isLogin = true;
      state.email = email;
      state.userID = userID;
      state.userName = userName;
    },
    REMOCE_ACTIVE_USER(state, action) {
      state.isLogin = false;
      state.email = null;
      state.userID = null;
      state.userName = null;
    },
  },
});

export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } = authSlice.actions;

export const selectIslogin = (state) => state.auth.isLogin;
export const selectEmail = (state) => state.auth.email;
export const selectUserName = (state) => state.auth.userName;
export const selectUserID = (state) => state.auth.userID;

export default authSlice.reducer;
