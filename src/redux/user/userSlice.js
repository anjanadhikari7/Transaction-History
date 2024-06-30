// Slice :  Used to build states using redux-toolkit
//1. Initial State
//2. Reducers

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      const { payload } = action;
      state.isAuthenticated = payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

// reducer renamed as userReducer for code redability
const { reducer: userReducer, actions } = userSlice;

export const { setIsAuthenticated, setUser } = actions;

export default userReducer;
