import { AuthProvider } from './contexts/AuthContext';
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Spinner from 'react-bootstrap/Spinner';
import Test from './Pages/App/Test.js';

// Lazy load pages
const ProtectedSignin = lazy(() => import('./utils/ProtectedSignin'));
const ProtectedRoute = lazy(() => import('./utils/ProtectedRoute'));
const RouteHome = lazy(() => import('./Pages/Home/RouteHome'));
const Home = lazy(() => import('./Pages/Home/Home'));
const Signup = lazy(() => import('./Pages/Home/Account/Signup'));
const Login = lazy(() => import('./Pages/Home/Account/Login'));
const ForgotPassword = lazy(() =>
    import('./Pages/Home/Account/ForgotPassword.js')
);
const NotFound = lazy(() => import('./Pages/Home/NotFound/NotFound'));

const App = () => {
    return (
        <AuthProvider>
            <Router basename='/to-do-list'>
                <Suspense
                    fallback={
                        <div className='styleSpinner'>
                            <Spinner animation='border' variant='primary' />
                        </div>
                    }
                >
                    <Routes>
                        <Route element={<ProtectedSignin />}>
                            <Route element={<RouteHome />}>
                                <Route path='/' element={<Home />} />
                                <Route path='signup' element={<Signup />} />
                                <Route path='login' element={<Login />} />
                                <Route
                                    path='forgot-password'
                                    element={<ForgotPassword />}
                                />
                                <Route path='*' element={<NotFound />} />
                            </Route>
                        </Route>
                        <Route path='/app' element={<ProtectedRoute />}>
                            <Route index element={<Test />} />
                            <Route path='/app/profile' element={<Test />} />
                        </Route>
                    </Routes>
                </Suspense>
            </Router>
        </AuthProvider>
    );
};

export default App;
