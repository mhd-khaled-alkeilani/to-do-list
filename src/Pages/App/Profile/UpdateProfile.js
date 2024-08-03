import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Card, Button, Alert, Container } from 'react-bootstrap';

import { useAuth } from '../../../contexts/AuthContext';

export default function UpdateProfile() {
    const { currentUser, editEmail, editPassword } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            setLoading(false);
            return setError('Password do not match');
        }

        const promises = [];

        if (emailRef.current.value !== currentUser.email)
            promises.push(editEmail(emailRef.current.value));

        if (passwordRef.current.value)
            promises.push(editPassword(passwordRef.current.value));

        Promise.all(promises)
            .then(() => navigate('/'))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    };

    return (
        <Container className='container-form'>
            <Card className='card-form'>
                <Card.Body>
                    <h2>Update Profile</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                </Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group id='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type='email'
                            ref={emailRef}
                            required
                            defaultValue={currentUser.email}
                        />
                    </Form.Group>
                    <Form.Group id='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            ref={passwordRef}
                            placeholder='Leave blank to keeep the same'
                        />
                    </Form.Group>
                    <Form.Group className='mb-4' id='password-confirm'>
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control
                            type='password'
                            ref={passwordConfirmRef}
                            placeholder='Leave blank to keeep the same'
                        />
                    </Form.Group>
                    <Button disabled={loading} className='w-100' type='submit'>
                        Update
                    </Button>
                </Form>

                <div className='more-link'>
                    <Link to='/'>Cancel</Link>
                </div>
            </Card>
        </Container>
    );
}
