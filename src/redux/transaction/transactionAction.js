// Create a transaction

import { createTransaction } from "../../axios/transactionAxios";

export const createTransactionAction = (transactionObj) => async (dispatch) => {
  // Call Axios
  const result = await createTransaction(transactionObj);
  if (result.statues === "error") {
    return toast.error(result.message);
  }

  // Call an axios to request API to fetch all transactions
};
