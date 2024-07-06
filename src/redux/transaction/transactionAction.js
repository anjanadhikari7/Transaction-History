// Create a transaction

import { toast } from "react-toastify";
import {
  createTransaction,
  getTransactions,
} from "../../axios/transactionAxios";
import { setTransaction } from "./transactionSlice";

export const createTransactionAction = (transactionObj) => async (dispatch) => {
  // Call Axios
  const result = await createTransaction(transactionObj);
  if (result.status === "error") {
    return toast.error(result.message);
  }

  // Call an axios to request API to fetch all transactions

  const transactionResult = await getTransactions(transactionObj.userId);

  if (transactionResult.status === "error") {
    return toast.error(transactionResult.message);
  }

  toast.success("Transaction Created");

  dispatch(setTransaction(transactionResult.data));
};
