import { use } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
    const { user, loading } = use(AuthContext);
    const location = useLocation();
    if (loading) {
        return <p>Loading...</p>;
    }
    if (user) {
        return children;
    }
    return <Navigate state={location.pathname} to="/register" />
};

export default PrivateRoute;