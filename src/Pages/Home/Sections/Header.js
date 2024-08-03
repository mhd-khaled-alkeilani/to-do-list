import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

import './Header.css';
import logo from '../../../assets/imgs/logo.svg';
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { useState } from 'react';

const Header = () => {
    const { clearError } = useAuth();
    const [HeaderScroll, setHeaderScroll] = useState(false);
    const changeHeaderBG = () => {
        // console.log(window.scrollY);
        if (window.scrollY >= 60) {
            setHeaderScroll(true);
        } else {
            setHeaderScroll(false);
        }
    };

    window.addEventListener('scroll', changeHeaderBG);

    return (
        <Navbar
            as='header'
            id='header'
            className={HeaderScroll ? 'header-scroll' : ''}
            expand='md'
            collapseOnSelect
        >
            <Container>
                <Navbar.Brand
                    className='col-sm-3'
                    as='div'
                    to='/'
                    onClick={clearError}
                >
                    <Nav.Link as={Link} to='/' href onClick={clearError}>
                        <img src={logo} alt='To-Do-List' />
                    </Nav.Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='offcanvasNavbar-expand-lg' />
                <Navbar.Offcanvas
                    aria-labelledby='offcanvasNavbarLabel-expand-lg'
                    placement='end'
                    className='col-sm-9'
                >
                    <Offcanvas.Header closeButton />
                    <Offcanvas.Body>
                        <Nav className='flex-grow-1 pe-3'>
                            <div className='navbar-link col-sm-8 justify-content-center'>
                                <Nav.Link
                                    as={NavLink}
                                    className={({ isActive, isPending }) =>
                                        isPending
                                            ? 'pending'
                                            : isActive
                                            ? 'active'
                                            : ''
                                    }
                                    to='/'
                                    href
                                    onClick={clearError}
                                >
                                    Home
                                </Nav.Link>
                                <Nav.Link
                                    as={NavLink}
                                    className={({ isActive, isPending }) =>
                                        isPending
                                            ? 'pending'
                                            : isActive
                                            ? 'active'
                                            : ''
                                    }
                                    to='/how-it-work'
                                    href
                                    onClick={clearError}
                                >
                                    How it work
                                </Nav.Link>
                                <Nav.Link
                                    as={NavLink}
                                    className={({ isActive, isPending }) =>
                                        isPending
                                            ? 'pending'
                                            : isActive
                                            ? 'active'
                                            : ''
                                    }
                                    to='/company'
                                    href
                                    onClick={clearError}
                                >
                                    Company
                                </Nav.Link>
                                <Nav.Link
                                    className={({ isActive, isPending }) =>
                                        isPending
                                            ? 'pending'
                                            : isActive
                                            ? 'active'
                                            : ''
                                    }
                                    as={NavLink}
                                    to='/contacts'
                                    href
                                    onClick={clearError}
                                >
                                    Contacts
                                </Nav.Link>
                            </div>
                            <div className='navbar-link  col-sm-4 justify-content-end'>
                                <Nav.Link
                                    as={Link}
                                    to='login'
                                    href
                                    onClick={clearError}
                                >
                                    Log In
                                </Nav.Link>
                                <Nav.Link
                                    id='link-signup'
                                    as={Link}
                                    to='signup'
                                    href
                                    onClick={clearError}
                                >
                                    Sign Up
                                </Nav.Link>
                            </div>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
};

export default Header;
