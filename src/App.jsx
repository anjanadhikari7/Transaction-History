import { Route, Routes } from "react-router-dom";
import SignupPage from "./Pages/signupPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./Pages/loginPage";
import TransactionPage from "./Pages/transactionPage";
import PrivateRoute from "./components/privateRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route
          path="/transaction"
          element={
            <PrivateRoute>
              <TransactionPage />
            </PrivateRoute>
          }
        ></Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
