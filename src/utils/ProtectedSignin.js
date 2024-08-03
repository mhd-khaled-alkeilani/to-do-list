import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

const ProtectedSignin = () => {
    const { currentUser } = useAuth();

    return currentUser ? <Navigate to='/app' /> : <Outlet />;
};

export default ProtectedSignin;
