import './Aside.css';
import { NavLink, useNavigate, Link } from 'react-router-dom';

import { useTaskContext } from '../../../contexts/TasksContext';
import { useAuth } from '../../../contexts/AuthContext';

import logo from '../../../assets/imgs/logo.svg';
import { NavDropdown, Accordion } from 'react-bootstrap';

import { RxDashboard } from 'react-icons/rx';
import { IoMdCube } from 'react-icons/io';
import { FaTasks } from 'react-icons/fa';

function Aside() {
    const { setSelectPriority, showAside } = useTaskContext();
    console.log(showAside);
    const { currentUser, logout, clearError, setError } = useAuth();
    const navigate = useNavigate();

    const handleSelectPriority = (e) => {
        setSelectPriority(e.target.value);
    };

    const handleLogout = async () => {
        setError('');
        try {
            await logout();
            navigate('/');
        } catch (err) {
            setError(
                err.message
                    .replace(/^Firebase:\s*/, '')
                    .replace(/\s*\(.*?\)\s*./g, '')
            );
        }
    };
    return (
        <aside className='section-aside col-3'>
            <div className='logo'>
                <img src={logo} className='logo' alt='to-do-list' />{' '}
            </div>
            <div className='profile-section'>
                <div>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='16'
                        height='16'
                        fill='currentColor'
                        className='bi bi-person-circle'
                        viewBox='0 0 16 16'
                    >
                        <path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0' />
                        <path
                            fillRule='evenodd'
                            d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1'
                        />
                    </svg>
                </div>

                <NavDropdown title={currentUser.displayName}>
                    <NavDropdown.Item
                        as={Link}
                        to='/profile'
                        onClick={clearError}
                    >
                        Edit Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to=''>
                        Setting
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to=''>
                        Link
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>
                        Logout
                    </NavDropdown.Item>
                </NavDropdown>
            </div>

            <hr />

            <div className='cards-links'>
                <NavLink
                    to='/'
                    className={({ isActive, isPending }) =>
                        isPending ? 'pending' : isActive ? 'active' : ''
                    }
                >
                    <RxDashboard className='icon-link' />
                    DashBoard
                </NavLink>
            </div>
            <div className='cards-links'>
                <NavLink
                    to='/projects'
                    className={({ isActive, isPending }) =>
                        isPending ? 'pending' : isActive ? 'active' : ''
                    }
                >
                    <IoMdCube className='icon-link' />
                    Projects
                </NavLink>
            </div>
            <Accordion>
                <Accordion.Item eventKey='0'>
                    <Accordion.Header>
                        <FaTasks className='icon-link' />
                        My Tasks
                    </Accordion.Header>
                    <Accordion.Body>
                        <div className='cards-links'>
                            <NavLink
                                to='/all_tasks'
                                className={({ isActive, isPending }) =>
                                    isPending
                                        ? 'pending'
                                        : isActive
                                        ? 'active'
                                        : ''
                                }
                            >
                                All Tasks
                            </NavLink>
                        </div>

                        <div className='cards-links'>
                            <NavLink
                                to='/daily_tasks'
                                className={({ isActive, isPending }) =>
                                    isPending
                                        ? 'pending'
                                        : isActive
                                        ? 'active'
                                        : ''
                                }
                            >
                                Daily Tasks
                            </NavLink>
                        </div>
                        <div className='cards-links'>
                            <NavLink
                                to='/all_tasks_completed'
                                className={({ isActive, isPending }) =>
                                    isPending
                                        ? 'pending'
                                        : isActive
                                        ? 'active'
                                        : ''
                                }
                            >
                                All Completed Tasks
                            </NavLink>
                        </div>
                        <div className='cards-links'>
                            <NavLink
                                to='/daily_tasks_completed'
                                className={({ isActive, isPending }) =>
                                    isPending
                                        ? 'pending'
                                        : isActive
                                        ? 'active'
                                        : ''
                                }
                            >
                                Completed Daily Tasks
                            </NavLink>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            {/* <div className='cards-links select-priority'>
                <h6>select priority</h6>
                <select name='priority' onChange={handleSelectPriority}>
                    <option value='all' defaultValue>
                        all
                    </option>
                    <option value='urgent'>urgent</option>
                    <option value='high'>high</option>
                    <option value='normal'>normal</option>
                    <option value='low'>low</option>
                </select>
            </div> */}
        </aside>
    );
}

export default Aside;
