/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { getToken } from "../utils/token"

const UserLoginRoutes = ({children}) => {
    const token = getToken();
    if(!token) {
        return <Navigate to='/' />
    }

    return children;
}

export default UserLoginRoutes