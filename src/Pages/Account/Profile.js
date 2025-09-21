import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';

const Profile = () => {
    const {
        currentUser,
        error,
        setError,
        loading,
        setLoading,
        editProfile,
        errorRedirectLink,
        setErrorRedirectLink,
        message,
        setMessage,
    } = useAuth();

    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (currentUser !== null) {
            setDisplayName(currentUser.displayName);
            setEmail(currentUser.email);
        }
    }, [currentUser]);
    const handleChangeName = (e) => {
        setDisplayName(e.target.value);
    };
    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        if (
            displayName !== currentUser.displayName ||
            email !== currentUser.email
        ) {
            editProfile(displayName, email, password);
        } else {
            setError("You don't change any thing");
            setMessage(null);
            setErrorRedirectLink(null);
            setLoading(false);
        }
    };
    return (
        <Container>
            <Card className='card-profile'>
                <Card.Body>
                    <h2>Profile</h2>
                    {error && (
                        <Alert variant='danger'>
                            {error}
                            {errorRedirectLink}
                        </Alert>
                    )}
                    {message && <Alert variant='success'>{message}</Alert>}
                </Card.Body>
                <Form className='card-form-profile' onSubmit={handleSubmit}>
                    <Form.Group id='DisplayName' className='mb-4'>
                        <Form.Label>Display Name:</Form.Label>
                        <Form.Control
                            type='DisplayName'
                            defaultValue={displayName}
                            onChange={(e) => {
                                handleChangeName(e);
                            }}
                        />
                    </Form.Group>
                    <Form.Group id='Email' className='mb-4'>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type='Email'
                            defaultValue={email}
                            onChange={(e) => {
                                handleChangeEmail(e);
                            }}
                        />
                    </Form.Group>
                    <Form.Group id='passwrod' className='mb-4'>
                        <Form.Label>Password for ensure:</Form.Label>
                        <div className='password-option '>
                            <Form.Control
                                type='passwrod'
                                required
                                onChange={(e) => {
                                    handleChangePassword(e);
                                }}
                            />
                            <Link
                                to='/profile/change-password'
                                style={{ color: 'red' }}
                            >
                                Change Password
                            </Link>
                        </div>
                    </Form.Group>

                    <Form.Group className='action-account'>
                        <Button disabled={loading} type='submit'>
                            save profile
                        </Button>
                        <Link to='/'>cancel</Link>
                    </Form.Group>
                </Form>
            </Card>
        </Container>
    );
};

export default Profile;
