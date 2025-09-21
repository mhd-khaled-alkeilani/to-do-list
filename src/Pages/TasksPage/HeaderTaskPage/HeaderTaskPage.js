import { useTaskContext } from '../../../contexts/TasksContext';
import './HeaderTaskPage.css';
import { FaSearch } from 'react-icons/fa';
import { IoIosNotifications, IoMdMenu } from 'react-icons/io';

const HeaderTaskPage = () => {
    const { setTextSearch, handleToggleAside } = useTaskContext();

    const handleChange = (e) => {
        setTextSearch(e.target.value);
    };

    return (
        <header className='section-HeaderTaskPage'>
            <div className='toggle-aside-btn'>
                <IoMdMenu onClick={handleToggleAside} />
            </div>

            <label className='search'>
                <FaSearch />
                <input
                    type='text'
                    placeholder='Search…'
                    onChange={(e) => handleChange(e)}
                />
            </label>
            <div className='notifications'>
                <IoIosNotifications />
            </div>
        </header>
    );
};

export default HeaderTaskPage;
