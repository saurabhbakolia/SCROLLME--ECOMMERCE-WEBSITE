import React from 'react';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import { Navigate, useLocation } from 'react-router-dom';


const ProtectedRoute = ({ children }) => {
    const user = useSelector((state) => state.user);
    let location = useLocation();

    if (!user.state.isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    return children;
}

export default ProtectedRoute