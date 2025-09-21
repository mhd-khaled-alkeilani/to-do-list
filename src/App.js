// src/App.js
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import { AuthProvider } from './contexts/AuthContext';
import './index.css';
import './App.css';
import Spinner from 'react-bootstrap/Spinner';

// Import routes
import RouteHome from './Pages/Home/RouteHome';
import RouteTaskPage from './Pages/TasksPage/RouteTaskPage';

// Import components
import Dashboard from './Pages/TasksPage/Dashboard/Dashboard';
import Projects from './Pages/TasksPage/Projects/Projects';

// Lazy load pages
const Signup = lazy(() => import('./Pages/Account/Signup'));
const PrivateSignin = lazy(() => import('./Pages/Account/PrivateSignin'));
const PrivateRoute = lazy(() => import('./Pages/Account/PrivateRoute'));
const Login = lazy(() => import('./Pages/Account/Login'));
const Profile = lazy(() => import('./Pages/Account/Profile'));
const Main = lazy(() => import('./Pages/TasksPage/Main/Main'));
const ResetPassword = lazy(() => import('./Pages/Account/components/ResetPassword'));
const ChangePassword = lazy(() => import('./Pages/Account/components/ChangePassword'));
const ForgotPassword = lazy(() => import('./Pages/Account/components/ForgotPassword'));
const NotFound = lazy(() => import('./Pages/NotFound/NotFound'));

const TASKS = {
    ALL_TASKS: { type: 'all_tasks', title: 'All Tasks' },
    DAILY_TASKS: { type: 'daily_tasks', title: 'Daily Tasks' },
    COMPLETED_ALL_TASKS: {
        type: 'completed_all_tasks',
        title: 'All Completed Tasks',
    },
    COMPLETED_DAILY_TASKS: {
        type: 'completed_daily_tasks',
        title: 'Completed Daily Tasks',
    },
};

function App() {
    return (
        <Router>
            <AuthProvider>
                <Suspense
                    fallback={
                        <div className='spinner-container'>
                            <Spinner animation='border' variant='primary' />
                        </div>
                    }
                >
                    <Routes>
                        <Route element={<PrivateSignin />}>
                            <Route element={<RouteHome />}>
                                <Route path='/signup' element={<Signup />} />
                                <Route path='/login' element={<Login />} />
                                <Route path='/forgot-password' element={<ForgotPassword />} />
                                <Route path='*' element={<NotFound />} />
                            </Route>
                        </Route>
                        <Route element={<PrivateRoute />}>
                            <Route element={<RouteTaskPage />}>
                                <Route path='/' element={<Dashboard />} />
                                <Route path='projects' element={<Projects />} />
                                <Route path='all_tasks' element={<Main {...TASKS.ALL_TASKS} />} />
                                <Route path='daily_tasks' element={<Main {...TASKS.DAILY_TASKS} />} />
                                <Route
                                    path='all_tasks_completed'
                                    element={<Main {...TASKS.COMPLETED_ALL_TASKS} />}
                                />
                                <Route
                                    path='daily_tasks_completed'
                                    element={<Main {...TASKS.COMPLETED_DAILY_TASKS} />}
                                />
                                <Route path='profile' element={<Profile />} />
                                <Route path='profile/reset-password' element={<ResetPassword />} />
                                <Route path='profile/change-password' element={<ChangePassword />} />
                            </Route>
                            <Route path='*' element={<NotFound />} />
                        </Route>
                    </Routes>
                </Suspense>
            </AuthProvider>
        </Router>
    );
}

export default App;
