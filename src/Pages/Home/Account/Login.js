import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { useMediaQuery } from 'react-responsive';

import { Form, Card, Button, Alert, Container } from 'react-bootstrap';
import heroLoginImg from '../../../assets/imgs/hero-login.svg';

export default function Login() {
    const { loading, login, error, clearError, errorRedirectLink } = useAuth();

    const emailRef = useRef();
    const passwordRef = useRef();

    const isBigScreen = useMediaQuery({
        query: '(min-width: 992px)',
    });

    async function handleSubmit(e) {
        e.preventDefault();
        login(emailRef.current.value, passwordRef.current.value);
    }

    return (
        <Container className='container-form'>
            <div className='section-login row'>
                <div className='sectoin-header'>
                    <h2>Log In</h2>
                    {error && (
                        <Alert variant='danger'>
                            {error}
                            {errorRedirectLink}
                        </Alert>
                    )}
                </div>

                <Card className='card-form col-lg-7'>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className='input-form'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter your email...'
                                ref={emailRef}
                                required
                            />
                        </Form.Group>
                        <Form.Group className='input-form'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Enter your password...'
                                ref={passwordRef}
                                required
                            />
                        </Form.Group>
                        <Button disabled={loading} type='submit'>
                            Log In
                        </Button>
                    </Form>
                    <div className='more-link'>
                        <Link to='/forgot-password' onClick={clearError}>
                            Forgot Password?
                        </Link>
                    </div>
                    <div className='more-link'>
                        Need an account?{' '}
                        <Link to='/signup' onClick={clearError}>
                            Sign Up
                        </Link>
                    </div>
                </Card>
                {isBigScreen && (
                    <div className='hero-login-img col-lg-5'>
                        <img src={heroLoginImg} alt='' />
                    </div>
                )}
            </div>
        </Container>
    );
}
