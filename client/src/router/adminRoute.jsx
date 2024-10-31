/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { getToken } from "../utils/token";

const AdminRoute = ({children}) => {
    const token = getToken();
    if(!token || token.role !== 'admin') {
        return <Navigate to="/" />
    }
    return children;
}

export default AdminRoute;