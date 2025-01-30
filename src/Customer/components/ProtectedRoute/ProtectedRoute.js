import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ element }) => {
//   const { user } = useAuth();
  const token = Cookies.get("jwtToken"); // Get token from cookies

  return token ? element : <Navigate to="/customer/login" />;
};

export default ProtectedRoute;
