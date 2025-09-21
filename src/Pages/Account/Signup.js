import { useRef } from 'react';
import { Link } from 'react-router-dom';

import { Form, Card, Button, Alert, Container } from 'react-bootstrap';

import { useAuth } from '../../contexts/AuthContext';

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
            <Card className='card-form'>
                <Card.Body>
                    <h2>Sign Up</h2>
                    {error && (
                        <Alert variant='danger'>
                            {error}
                            {errorRedirectLink}
                        </Alert>
                    )}
                </Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Display Name:</Form.Label>
                        <Form.Control
                            type='text'
                            ref={DisplayNameRef}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' ref={emailRef} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            ref={passwordRef}
                            required
                        />
                    </Form.Group>
                    <Form.Group className='mb-4'>
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control
                            type='password'
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
        </Container>
    );
}
