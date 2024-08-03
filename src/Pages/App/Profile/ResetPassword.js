import { Form, Card, Button, Alert, Container } from 'react-bootstrap';
import { useAuth } from '../../../contexts/AuthContext';

export default function ResetPassword() {
    const { currentUser, resetPassword, loading, error, message } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();

        resetPassword(currentUser.email);
    }
    return (
        <Container className='container-form'>
            <Card className='card-form'>
                <Card.Body>
                    <h2>Password Reset</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    {message && <Alert variant='success'>{message}</Alert>}
                </Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Button disabled={loading} className='w-100' type='submit'>
                        Reset Password
                    </Button>
                </Form>
            </Card>
        </Container>
    );
}
