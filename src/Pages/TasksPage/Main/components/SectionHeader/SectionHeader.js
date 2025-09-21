import { useEffect, useState, useCallback } from 'react';
import { useTaskContext } from '../../../../../contexts/TasksContext';

import './SectionHeader.css';

import { IoIosAddCircleOutline } from 'react-icons/io';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { PopupAdd } from '../index';
const SectionHeader = ({ count, titleHeader, type }) => {
    const { handleShowCreate, showCreate, date, setDate } = useTaskContext();
    const [days, setDays] = useState(0);

    const incrementDate = useCallback(() => {
        setDays((prevState) => prevState + 1);
    }, []);

    const decrementDate = useCallback(() => {
        setDays((prevState) => prevState - 1);
    }, []);

    useEffect(() => {
        setDate(
            (prevState) => new Date(Date.now() + days * 24 * 60 * 60 * 1000)
        );
    }, [days, setDate]);

    return (
        <div className='section-header'>
            <h1>{titleHeader}</h1>
            {type === 'daily_tasks' || type === 'completed_daily_tasks' ? (
                <div className='date'>
                    <button onClick={decrementDate}>
                        <FaArrowLeft />
                    </button>

                    {date.toISOString().substring(0, 10)}
                    <button onClick={incrementDate}>
                        <FaArrowRight />
                    </button>
                </div>
            ) : null}

            <div className='tools'>
                <div className='selections'>
                    <div className='clear-select'>count tasks: {count}</div>
                </div>
                {type === 'all_tasks' || type === 'daily_tasks' ? (
                    <div>
                        <button onClick={handleShowCreate}>
                            <IoIosAddCircleOutline />
                        </button>
                        {showCreate ? <PopupAdd /> : null}
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default SectionHeader;
