import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// Wrapper Component
const PrivateRoute = (props) => {
  const { children } = props;

  const { isAuthenticated } = useSelector((state) => state.user);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
