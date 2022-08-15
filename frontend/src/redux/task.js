import update from 'react-addons-update';
import tasks from '../assets/json/task.json'
const SET_TASK = 'task/SET_TASK';
const ADD_TASK = 'task/ADD_TASK';
const DELETE_TASK = 'task/DELETE_TASK';


export const setTask = (task) => ({ type: SET_TASK, task });
export const addTask = (task) => ({ type: ADD_TASK, task });
export const deleteTask = (id) => ({ type: DELETE_TASK, id });

const initialState = tasks;

const task = (state = initialState, action) => {

    switch (action.type) {
        case SET_TASK:
            let newCalendarEvents = [...state];
            const clickedEventIdx = newCalendarEvents.findIndex(
                (event) => event.id == action.task.id
              );
            newCalendarEvents[clickedEventIdx] = {...newCalendarEvents[clickedEventIdx],...action.task}
            return update(state, { $set: newCalendarEvents});
        case ADD_TASK:
            return update(state, { $push: action.task });
        case DELETE_TASK:
            return update(state, { $splice: [[action.id, 1]] });
        default:
            return state;
    }
}

export default task;