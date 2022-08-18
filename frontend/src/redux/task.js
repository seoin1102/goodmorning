import update from 'react-addons-update';
//import tasks from '../assets/json/task.json'
// const CHANGE_TASK = 'task/CHANGE_TASK';
const SET_TASK = 'task/SET_TASK';
const ADD_TASK = 'task/ADD_TASK';
const DELETE_TASK = 'task/DELETE_TASK';
const UPDATE_TASK = 'task/UPDATE_TASK';

// export const changeTask = (changeTask) => ({ type: CHANGE_TASK, changeTask });
export const setTask = (tasks) => ({ type: SET_TASK, tasks });
export const addTask = (task) => ({ type: ADD_TASK, task });
export const deleteTask = (id) => ({ type: DELETE_TASK, id });
export const updateTask = (id, task) => ({ type: UPDATE_TASK, id, task})

const initialState = []

const task = (state = initialState, action) => {

    switch (action.type) {
        // case CHANGE_TASK:
        //     let newCalendarEvents = [...state];
        //     const clickedEventIdx = newCalendarEvents.findIndex(
        //         (event) => event.id == action.task.id
        //       );
        //     newCalendarEvents[clickedEventIdx] = {...newCalendarEvents[clickedEventIdx],...action.task}
        //     return update(state, { $set: newCalendarEvents});
        case SET_TASK:
            return update(state, { $set: action.tasks });    
        case ADD_TASK:
            return update(state, { $push: action.task });
        case DELETE_TASK:
            return update(state, { $splice: [[action.id, 1]] });
        case UPDATE_TASK:
            return update(state, { [action.id]: { $set: action.task }})
        default:
            return state;
    }
}

export default task;