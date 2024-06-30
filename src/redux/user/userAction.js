// File responsible to call axios functions and dispatch actions for updateing state based on response
// Uses the actions given by slice

import { toast } from "react-toastify";
import { loginUser } from "../../axios/userAxios";
import { setIsAuthenticated, setUser } from "./userSlice";

// UI ---- [ACTION] -------API -------- comes with response -----dispatch actions

// Login Action

export const loginUserAction = (userObject) => async (dispatch) => {
  // Call Axios
  const result = await loginUser(userObject);

  if (result.statues === "error") {
    return toast.error(result.message);
  }

  dispatch(setIsAuthenticated(true));
  dispatch(setUser(result.data));
  toast.success(result.message);
};
