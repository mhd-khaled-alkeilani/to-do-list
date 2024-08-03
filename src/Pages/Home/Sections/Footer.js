import React from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <Navbar bg='primary' data-bs-theme='dark'>
            <Container>
                <Navbar.Brand as={NavLink} to='/'>
                    Footer
                </Navbar.Brand>
                <Nav className='me-auto'>
                    <Nav.Link as={NavLink} to='/login'>
                        Login
                    </Nav.Link>
                    <Nav.Link as={NavLink} to='/signup'>
                        signup
                    </Nav.Link>
                    <Nav.Link as={NavLink} to='/profile'>
                        Profile
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;
