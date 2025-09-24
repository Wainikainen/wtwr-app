import { useContext } from "react";
import { Navigate } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ProtectedRoute ({ children }) {
    const { currentUser } = useContext(CurrentUserContext);
    if(!currentUser || !localStorage.getItem("jwt")) {
        return <Navigate to="/"/>;
    }
    return children;
}

export default ProtectedRoute;