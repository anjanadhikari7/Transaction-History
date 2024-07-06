// Create a transaction

import { toast } from "react-toastify";
import {
  createTransaction,
  deleteTransaction,
  getTransactions,
} from "../../axios/transactionAxios";
import { setTransaction } from "./transactionSlice";

// Get all transaction

export const getTransactionAction = (userId) => async (dispatch) => {
  // call axios

  const result = await getTransactions(userId);
  if (result.status === "success") {
    dispatch(setTransaction(result.data));
  }
};

// Create transaction

export const createTransactionAction = (transactionObj) => async (dispatch) => {
  // Call Axios
  const result = await createTransaction(transactionObj);
  if (result.status === "error") {
    return toast.error(result.message);
  }

  // Call an axios to request API to fetch all transactions
  // Can be refractored to call getTransactionAction
  const transactionResult = await getTransactions(transactionObj.userId);

  if (transactionResult.status === "error") {
    return toast.error(transactionResult.message);
  }

  toast.success("Transaction Created");

  dispatch(setTransaction(transactionResult.data));
};

// delete Transaction

export const deleteTransactionAction =
  (selectedIds, userId) => async (dispatch) => {
    console.log(selectedIds, userId);
    const result = await deleteTransaction(selectedIds, userId);

    if ((result.status = "success")) {
      toast.success("Deleted successfully");
      dispatch(getTransactionAction(userId));
    }
  };
