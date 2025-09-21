import './Main.css';
import React from 'react';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../firebase';
import { useAuth } from '../../../contexts/AuthContext';
import { useTaskContext } from '../../../contexts/TasksContext';
import Spinner from 'react-bootstrap/Spinner';
import { SectionHeader, SectionTasks, SectionTask } from './components/index';
import { PopupEdit } from './components/index';

const Main = ({ type, title }) => {
    const { currentUser } = useAuth();
    const { textSearch, showEdit, date, selectPriority, showAside } =
        useTaskContext();

    console.log('main');
    const [toDoList, setToDoList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const styleSpinner = useMemo(
        () => ({
            position: 'absolute',
            top: '50%',
            left: '60%',
        }),
        []
    );

    const fetchTasks = useCallback(() => {
        setLoading(true);
        setError(null);
        const colRef = collection(db, `users/${currentUser.uid}/tasks`);
        const conditions = [];

        if (type === 'all_tasks' || type === 'daily_tasks') {
            conditions.push(where('completed', '==', false));
        } else {
            conditions.push(where('completed', '==', true));
        }

        if (type === 'daily_tasks' || type === 'completed_daily_tasks') {
            conditions.push(
                where('date', '==', date.toISOString().substring(0, 10))
            );
        }

        if (selectPriority !== 'all') {
            conditions.push(where('priority', '==', selectPriority));
        }

        const queryRef = query(colRef, ...conditions);
        getDocs(queryRef)
            .then((res) => {
                setToDoList(
                    res.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                    }))
                );
            })
            .catch((err) => console.error(err))
            .finally(() => {
                setLoading(false);
            });
    }, [currentUser, type, date, selectPriority]);

    useEffect(() => {
        fetchTasks();
        setLoading(false);
    }, [fetchTasks, type, showAside]);

    const filteredToDoList = useMemo(() => {
        // return toDoList.filter((task) =>
        //     task.title.toLowerCase().includes(textSearch.toLowerCase())
        // );
        return toDoList;
    }, [toDoList]);

    if (loading) {
        return (
            <Spinner
                style={styleSpinner}
                animation='border'
                variant='primary'
            />
        );
    }

    if (error) {
        return <div className='error-message'>{error}</div>;
    }

    return (
        <>
            <SectionHeader
                count={filteredToDoList.length}
                titleHeader={title}
                type={type}
            />
            
            <SectionTasks>
                {filteredToDoList.map((task) => (
                    <SectionTask
                        key={task.id}
                        id={task.id}
                        completed={task.completed}
                        title={task.title}
                        description={task.description}
                        priority={task.priority}
                        date={task.date}
                    />
                ))}
            </SectionTasks>
            {showEdit && <PopupEdit />}
        </>
    );
};

export default React.memo(Main);
