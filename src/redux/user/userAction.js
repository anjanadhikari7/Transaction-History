// File responsible to call axios functions and dispatch actions for updateing state based on response
// Uses the actions given by slice

import { toast } from "react-toastify";
import { createUser, loginUser } from "../../axios/userAxios";
import { setIsAuthenticated, setIsLoading, setUser } from "./userSlice";

// UI ---- [ACTION] -------API -------- comes with response -----dispatch actions

// Login Action

export const loginUserAction = (userObject) => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    // Call Axios
    const result = await loginUser(userObject);

    if (result.status === "error") {
      toast.error(result.message);
      dispatch(setIsLoading(false));
      return;
    }

    dispatch(setIsAuthenticated(true));
    dispatch(setUser(result.data));
    toast.success(result.message);
  } catch (error) {
    toast.error(result.message);
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const SignUpUserAction = (formData) => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    const result = await createUser(formData);
    // Error handling
    if (result.status === "error") {
      toast.error(result.message);
      dispatch(setIsLoading(false));
      return;
    }

    // Success
    toast.success(result.message);
  } catch (error) {
    toast.error(result.message);
  } finally {
    dispatch(setIsLoading(false));
  }
};
