import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            const userStr = localStorage.getItem('user');

            if (!token || !userStr) {
                setIsAuthenticated(false);
                return;
            }

            try {
                const user = JSON.parse(userStr);
                setIsAuthenticated(true);
                // Allow Admin or Manager
                setIsAuthorized(user.role === 'Admin' || user.role === 'Manager');
            } catch (e) {
                console.error("Auth Check Failed", e);
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return <div className="text-white text-center py-20">Verifying access...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!isAuthorized) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default AdminRoute;
