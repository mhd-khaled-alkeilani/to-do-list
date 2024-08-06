import '../Home/Account/Account.css';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Home/Sections/Header';
const RouteHome = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
};

export default RouteHome;
