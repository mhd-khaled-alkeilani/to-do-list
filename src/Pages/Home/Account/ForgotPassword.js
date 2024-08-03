import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Form, Card, Button, Alert, Container } from 'react-bootstrap';
import { useAuth } from '../../../contexts/AuthContext';

export default function ForgotPassword() {
    const {
        resetPassword,
        loading,
        error,
        clearError,
        errorRedirectLink,
        message,
    } = useAuth();

    const emailRef = useRef();

    async function handleSubmit(e) {
        e.preventDefault();

        resetPassword(emailRef.current.value);
    }
    return (
        <Container className='container-form'>
            <Card className='card-form'>
                <Card.Body>
                    <h2>Password Reset</h2>
                    {error && (
                        <Alert variant='danger'>
                            {error}
                            {errorRedirectLink}
                        </Alert>
                    )}
                    {message && <Alert variant='success'>{message}</Alert>}
                </Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-3'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' ref={emailRef} required />
                    </Form.Group>

                    <Button disabled={loading} className='w-100' type='submit'>
                        Reset Password
                    </Button>
                </Form>
                <div className='more-link'>
                    Already have an account?{' '}
                    <Link to='/login' onClick={clearError}>
                        Login
                    </Link>
                </div>
                <div className='more-link'>
                    Need an account?{' '}
                    <Link to='/signup' onClick={clearError}>
                        Sign Up
                    </Link>
                </div>
            </Card>
        </Container>
    );
}
