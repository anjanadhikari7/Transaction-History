import axios from "axios";

// Server URL

const API_BASE_URL = "http://localhost:8000";
const userEndpoint = "/api/transaction";

const API_URL = API_BASE_URL + userEndpoint;
//  Add Tranaction | Create | POST

export const createTransaction = (transactionObj) => {
  const response = axios
    .post(`${API_URL}`, transactionObj)
    .then((res) => res.data)
    .catch((error) => console.log(error));

  return response;
};
