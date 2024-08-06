import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { useMediaQuery } from 'react-responsive';

import { Form, Card, Button, Alert, Container } from 'react-bootstrap';

import heroLoginImg from '../../../assets/imgs/hero-login.svg';

export default function Signup() {
    const {
        loading,
        signup,
        error,
        setError,
        clearError,
        errorRedirectLink,
        setErrorRedirectLink,
    } = useAuth();

    const DisplayNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    const isBigScreen = useMediaQuery({
        query: '(min-width: 992px)',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            setError('Password do not match');
            setErrorRedirectLink(null);
        } else {
            signup(
                DisplayNameRef.current.value,
                emailRef.current.value,
                passwordRef.current.value
            );
        }
    };

    return (
        <Container className='container-form'>
            <div class='section-signup row'>
                <div className='sectoin-header'>
                    <h2>Sign Up</h2>
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
                            <Form.Label>User Name:</Form.Label>
                            <Form.Control
                                placeholder='Enter your User Name...'
                                type='text'
                                ref={DisplayNameRef}
                                required
                            />
                        </Form.Group>
                        <Form.Group className='input-form'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                placeholder='Enter your email...'
                                type='email'
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
                        <Form.Group className='input-form'>
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Enter your password confirmation...'
                                ref={passwordConfirmRef}
                                required
                            />
                        </Form.Group>
                        <Button disabled={loading} type='submit'>
                            Sing Up
                        </Button>
                    </Form>
                    <div className='more-link'>
                        Already have an account?{' '}
                        <Link to='/login' onClick={clearError}>
                            Log In
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
