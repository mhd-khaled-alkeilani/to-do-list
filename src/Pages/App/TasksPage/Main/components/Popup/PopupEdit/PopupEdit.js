import './PopupEdit.css';
import { useEffect, useReducer } from 'react';

import { useAuth } from '../../../../../../contexts/AuthContext';
import { useTaskContext } from '../../../../../../contexts/TasksContext';

import { Modal, Container, Row, Form, Button } from 'react-bootstrap';
import { PiFlagPennantFill } from 'react-icons/pi';

const PopupEdit = () => {
    // const [loading, setLoading] = useState(true);
    const { updateTask, getDataTask, loading } = useAuth();
    const { id, showEdit, handleCloseEdit, priorityFlagColor } =
        useTaskContext();

    const initialState = {
        title: '',
        description: '',
        priority: '',
        date: '',
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case 'update':
                return {
                    ...state,
                    [action.field]: action.value,
                };
            case 'setForm':
                return {
                    ...state,
                    ...action.payload,
                };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getDataTask(id);
                dispatch({ type: 'setForm', payload: res.data() });
                // console.log(res);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id, getDataTask]);

    const handleChange = (e) => {
        dispatch({
            type: 'update',
            field: e.target.name,
            value: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateTask(id, state);
        handleCloseEdit(); // Close the modal after updating the task
    };

    if (loading) {
        return null; // or a spinner/loading indicator
    }

    return (
        <Modal show={showEdit} onHide={handleCloseEdit} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Edit Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <div className='col-md-8 col-12'>
                                <Form.Group className='mb-3'>
                                    <Form.Label htmlFor='title_of_task'>
                                        Title of task
                                    </Form.Label>
                                    <Form.Control
                                        type='text'
                                        name='title'
                                        placeholder='title'
                                        required
                                        autoFocus
                                        value={state.title}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group className='mb-4'>
                                    <Form.Label htmlFor='description_of_task'>
                                        Description of task
                                    </Form.Label>
                                    <Form.Control
                                        as='textarea'
                                        name='description'
                                        rows={3}
                                        value={state.description}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group className='mb-3'>
                                    <Form.Label htmlFor='select_priority'>
                                        Select Priority
                                    </Form.Label>
                                    <div className='select-priority'>
                                        <Form.Select
                                            size='sm'
                                            name='priority'
                                            required
                                            value={state.priority}
                                            onChange={handleChange}
                                        >
                                            <option value='urgent'>
                                                urgent
                                            </option>
                                            <option value='high'>high</option>
                                            <option value='normal'>
                                                normal
                                            </option>
                                            <option value='low'>low</option>
                                        </Form.Select>
                                        <span>
                                            <PiFlagPennantFill
                                                style={{
                                                    color: priorityFlagColor[
                                                        state.priority
                                                    ],
                                                }}
                                            />
                                        </span>
                                    </div>
                                </Form.Group>
                            </div>
                            <div className='col-md-4 col-12'>
                                <Form.Group className='select-date mb-3'>
                                    <Form.Label htmlFor='select_date'>
                                        Select Date:
                                    </Form.Label>
                                    <Form.Control
                                        type='date'
                                        name='date'
                                        value={state.date}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </div>
                        </Row>
                        <Modal.Footer>
                            <Button
                                variant='secondary'
                                onClick={handleCloseEdit}
                            >
                                Close
                            </Button>
                            <Button variant='success' type='submit'>
                                Edit
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Container>
            </Modal.Body>
        </Modal>
    );
};

export default PopupEdit;
