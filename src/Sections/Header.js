import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import './Header.css';
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';

const Header = () => {
    const { clearError } = useAuth();

    return (
        <Navbar as='header' expand='sm' collapseOnSelect>
            <Container>
                <Navbar.Brand as={Link} to='/' onClick={clearError}>
                    ToDo List
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='offcanvasNavbar-expand-sm' />
                <Navbar.Offcanvas
                    aria-labelledby='offcanvasNavbarLabel-expand-sm'
                    placement='end'
                >
                    <Offcanvas.Header closeButton />
                    <Offcanvas.Body>
                        <Nav className='justify-content-end flex-grow-1 pe-3'>
                            <Nav.Link
                                as={Link}
                                to='/login'
                                href
                                onClick={clearError}
                            >
                                Log In
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to='/signup'
                                href
                                onClick={clearError}
                            >
                                Sign Up
                            </Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
};

export default Header;
