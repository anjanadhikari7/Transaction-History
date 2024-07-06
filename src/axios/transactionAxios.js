import axios from "axios";

// Server URL

const API_BASE_URL = "http://localhost:8000";
const userEndpoint = "/api/transaction";

const API_URL = API_BASE_URL + userEndpoint;
//  Add Tranaction | Create | POST

export const createTransaction = (transactionObj) => {
  const response = axios
    .post(`${API_URL}`, transactionObj, {
      headers: {
        Authorization: transactionObj.userId,
      },
    })
    .then((res) => res.data)
    .catch((error) => console.log(error));

  return response;
};

// Get all transaction | GET

export const getTransactions = (userId) => {
  const response = axios
    .get(API_URL, {
      headers: {
        Authorization: userId,
      },
    })
    .then((res) => res.data)
    .catch((error) => console.log(error));

  return response;
};

// Delete selected transaction | DELETE

export const deleteTransation = (selectedIds, userId) => {
  const response = axios
    .delete(API_URL, {
      headers: {
        authorization: userId,
      },
      data: {
        selectedIds,
      },
    })
    .then((res) => res.data)
    .catch((error) => error);

  return response;
};
