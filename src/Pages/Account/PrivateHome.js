import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import Home from '../Home/Home';

const PrivateHome = () => {
    const { currentUser } = useAuth();

    return currentUser ? <Outlet /> : <Navigate to={<Home />} />;
};

export default PrivateHome;
