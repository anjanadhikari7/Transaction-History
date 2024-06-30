// Create a transaction

import { createTransaction } from "../../axios/transactionAxios";

export const createTransactionAction = (transactionObj) => async (dispatch) => {
  // Call Axios
  const result = await createTransaction(transactionObj);
};
