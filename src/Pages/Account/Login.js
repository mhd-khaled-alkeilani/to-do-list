import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Form, Card, Button, Alert, Container } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';

export default function Login() {
    const { loading, login, error, clearError, errorRedirectLink } = useAuth();
    // setError(null);

    const emailRef = useRef();
    const passwordRef = useRef();
    // const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        login(emailRef.current.value, passwordRef.current.value);
    }

    return (
        <Container className='container-form'>
            <Card className='card-form'>
                <Card.Body>
                    <h2>Log In</h2>
                    {error && (
                        <Alert variant='danger'>
                            {error}
                            {errorRedirectLink}
                        </Alert>
                    )}
                </Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' ref={emailRef} required />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
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
        </Container>
    );
}
