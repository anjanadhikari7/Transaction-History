import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [],
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTransaction: (state, action) => {
      state.transactions = action.payload;
    },
  },
});

const { reducer: transactionReducer, actions } = transactionSlice;

export const { setTransaction } = actions;

export default transactionReducer;
