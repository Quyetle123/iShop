/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { getToken } from "../utils/token";

const AdministatorRoute = ({ children }) => {
  const token = getToken();
  if (!token || token.role !== "administrator") {
    return <Navigate to="/" />;
  }
  return children;
};

export default AdministatorRoute;
