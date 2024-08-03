import React from 'react';
import './RouteTaskPage.css';
import TaskContextProvider from '../../contexts/TasksContext';

import Aside from './Aside/Aside';
import Container from './Container/Container';
import HeaderTaskPage from './HeaderTaskPage/HeaderTaskPage';
// import RouterMain from './sections/Main/RouterMain';
import { Outlet } from 'react-router-dom';
// import Main from './sections/Main/Main';

const RouteTaskPage = () => {
    return (
        <TaskContextProvider>
            <Container>
                <Aside />
                <main>
                    <HeaderTaskPage />
                    <Outlet />
                </main>
            </Container>
        </TaskContextProvider>
    );
};

export default RouteTaskPage;
