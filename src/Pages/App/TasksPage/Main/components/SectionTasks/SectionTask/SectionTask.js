import './SectionTask.css';
import { useAuth } from '../../../../../../contexts/AuthContext';
import { useTaskContext } from '../../../../../../contexts/TasksContext';

import { MdDelete } from 'react-icons/md';
import { PiFlagPennantFill } from 'react-icons/pi';
import { FaCheckSquare } from 'react-icons/fa';
import { TbArrowBackUp } from 'react-icons/tb';

const SectionTask = ({ completed, id, title, description, priority, date }) => {
    const { compleatedTask, deleteTask } = useAuth();
    const { priorityFlagColor, handleShowEdit } = useTaskContext();

    const handleCompleated = (id, completed) => {
        const confirm = window.confirm(
            !completed
                ? 'Did you complete this task?'
                : 'Do you want to return this task to your uncomplete tasks list?'
        );
        confirm && compleatedTask(id, completed);
    };

    const handleDelete = (id) => {
        const confirm = window.confirm('Did you Delete this task?');
        confirm && deleteTask(id);
    };

    return (
        <div className='sectoin-task'>
            {!completed ? (
                <FaCheckSquare
                    className='task-completed'
                    onClick={() => handleCompleated(id, completed)}
                />
            ) : (
                <TbArrowBackUp
                    className='task-completed'
                    onClick={() => handleCompleated(id, completed)}
                />
            )}

            <div className='wrapper-section-task'>
                <div className='wrapper-task-content'>
                    <div className='task-content'>
                        <h3 className='task-title'>{title}</h3>
                        <h4 className='task-description'>{description}</h4>
                        <h4>{date}</h4>
                    </div>
                    <PiFlagPennantFill
                        style={{
                            color: priorityFlagColor[priority],
                            width: '26px',
                            height: '26px',
                        }}
                    />
                </div>

                <div className='task-option'>
                    {!completed ? (
                        <button
                            className='btn btn-primary'
                            onClick={() => handleShowEdit(id)}
                        >
                            Edit
                        </button>
                    ) : null}

                    <button
                        className='task-delete'
                        onClick={() => handleDelete(id)}
                    >
                        <MdDelete />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SectionTask;
