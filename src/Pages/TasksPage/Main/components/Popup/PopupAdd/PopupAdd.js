import { useReducer } from 'react';

import './PopupAdd.css';
import { Modal, Container, Row, Form, Button } from 'react-bootstrap';
import { PiFlagPennantFill } from 'react-icons/pi';

import { useAuth } from '../../../../../../contexts/AuthContext';
import { useTaskContext } from '../../../../../../contexts/TasksContext';

const PopupAdd = () => {
    const { addTask } = useAuth();
    const { showCreate, handleCloseCreate, priorityFlagColor } =
        useTaskContext();

    // init now date
    var curr = new Date();
    curr.setDate(curr.getDate());
    var dateToDay = curr.toISOString().substring(0, 10);

    const intiState = {
        title: '',
        description: '',
        priority: 'urgent',
        date: dateToDay,
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case 'input':
                return {
                    ...state,
                    [action.field]: action.value,
                };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, intiState);

    const handleChange = (e) => {
        dispatch({
            type: 'input',
            field: e.target.name,
            value: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addTask(state);
        handleCloseCreate();
    };
    return (
        <Modal show={showCreate} onHide={handleCloseCreate} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Create Task</Modal.Title>
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
                                        onChange={handleChange}
                                        placeholder='title'
                                        required
                                        autoFocus
                                    />
                                </Form.Group>
                                <Form.Group className='mb-4'>
                                    <Form.Label htmlFor='description_of_task'>
                                        Description of task
                                    </Form.Label>
                                    <Form.Control
                                        as='textarea'
                                        name='description'
                                        onChange={(e) => handleChange(e)}
                                        rows={3}
                                    />
                                </Form.Group>
                                <Form.Group className='mb-3'>
                                    <Form.Label htmlFor='select_priority'>
                                        Select Priority
                                    </Form.Label>
                                    <div className='select-priority'>
                                        <Form.Select
                                            size='sm'
                                            onChange={handleChange}
                                            name='priority'
                                            required
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
                                        onChange={handleChange}
                                        required
                                        defaultValue={state.date}
                                    />
                                </Form.Group>
                            </div>
                        </Row>
                        <Modal.Footer>
                            <Button
                                variant='secondary'
                                onClick={handleCloseCreate}
                            >
                                Close
                            </Button>
                            <Button variant='primary' type='submit'>
                                Add
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Container>
            </Modal.Body>
        </Modal>
    );
};

export default PopupAdd;
