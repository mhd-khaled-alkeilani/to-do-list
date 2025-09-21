import {
    createContext,
    useReducer,
    useContext,
    useMemo,
    useState,
} from 'react';

const TaskContext = createContext({});
export const useTaskContext = () => useContext(TaskContext);

const priorityFlagColor = {
    urgent: '#c1121f',
    high: '#FFF200',
    normal: '#219ebc',
    low: '#8B8C89',
};

const initialState = {
    textSearch: '',
    selectPriority: 'all',
    showCreate: false,
    showEdit: false,
    showAside: false,
    id: '',
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_TEXT_SEARCH':
            return { ...state, textSearch: action.payload };

        case 'SET_PRIORITY':
            return { ...state, selectPriority: action.payload };
        case 'SHOW_CREATE':
            return { ...state, showCreate: true };
        case 'CLOSE_CREATE':
            return { ...state, showCreate: false };
        case 'SHOW_EDIT':
            return { ...state, showEdit: true, id: action.payload };
        case 'CLOSE_EDIT':
            return { ...state, showEdit: false, id: '' };
        case 'TOGGLE_ASIDE':
            return { showAside: !state.showAside };
        default:
            return state;
    }
};

const TaskContextProvider = ({ children }) => {
    const [date, setDate] = useState(new Date());
    const [state, dispatch] = useReducer(reducer, initialState);
    const contextValue = useMemo(
        () => ({
            ...state,
            setTextSearch: (text) =>
                dispatch({ type: 'SET_TEXT_SEARCH', payload: text }),
            setSelectPriority: (priority) =>
                dispatch({ type: 'SET_PRIORITY', payload: priority }),
            handleShowCreate: () => dispatch({ type: 'SHOW_CREATE' }),
            handleCloseCreate: () => dispatch({ type: 'CLOSE_CREATE' }),
            handleShowEdit: (id) =>
                dispatch({ type: 'SHOW_EDIT', payload: id }),
            handleCloseEdit: () => dispatch({ type: 'CLOSE_EDIT' }),
            handleToggleAside: () => dispatch({ type: 'TOGGLE_ASIDE' }),
            priorityFlagColor,
            date,
            setDate,
        }),
        [state, date, setDate]
    );

    return (
        <TaskContext.Provider value={contextValue}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskContextProvider;
