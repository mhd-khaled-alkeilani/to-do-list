import { useRef } from 'react';

import { Form, Card, Button, Alert, Container } from 'react-bootstrap';

import { useAuth } from '../../../contexts/AuthContext';

export default function ChangePassword() {
    const {
        loading,
        editPassword,
        error,
        setError,
        errorRedirectLink,
        setErrorRedirectLink,
        message,
        setMessage,
    } = useAuth();

    const oldPasswordRef = useRef();
    const newPasswordRef = useRef();
    const passwordConfirmRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPasswordRef.current.value !== passwordConfirmRef.current.value) {
            setError('Password do not match');
            setMessage(null);
            setErrorRedirectLink(null);
        } else {
            editPassword(
                oldPasswordRef.current.value,
                newPasswordRef.current.value
            );
        }
    };

    return (
        <Container className='container-form'>
            <Card className='card-form'>
                <Card.Body>
                    <h2>Change Password</h2>
                    {error && (
                        <Alert variant='danger'>
                            {error}
                            {errorRedirectLink}
                        </Alert>
                    )}
                    {message && <Alert variant='success'>{message}</Alert>}
                </Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Old Password:</Form.Label>
                        <Form.Control
                            type='password'
                            ref={oldPasswordRef}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            type='password'
                            ref={newPasswordRef}
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
                        Save
                    </Button>
                </Form>
            </Card>
        </Container>
    );
}
