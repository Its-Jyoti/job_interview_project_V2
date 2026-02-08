import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // Example logic for checking if the user is authenticated
    const isAuthenticated = !!localStorage.getItem('token');  // You can use your own authentication logic here

    if (!isAuthenticated) {
        // If the user is not authenticated, redirect to the login page
        return <Navigate to="/login" />;
    }

    // If authenticated, allow the user to access the protected route
    return children;
};

export default ProtectedRoute;
