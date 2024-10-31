/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { getToken } from "../utils/token";

const UserRoute = ({ children }) => {
  const token = getToken();
  if (!token) {
    return children;
  } else if (token.role === "user") {
    return children;
  }
  return <Navigate to={`${token.role}`} />;
};

export default UserRoute;
