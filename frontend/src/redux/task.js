import update from 'react-addons-update';

const SET_TASK = 'task/SET_TASK';
const ADD_TASK = 'task/ADD_TASK';
const DELETE_TASK = 'task/DELETE_TASK';


export const setTask = (tasks) => ({type: SET_TASK, tasks});
export const addTask = (task) => ({type: ADD_TASK, task});
export const deleteTask = (taskNo) => ({type: DELETE_TASK, taskNo});

const initialState = [];

const task = (state = initialState, action) => {
    switch(action.type){
        case SET_TASK:
            return update(state, {$set: action.tasks});
        case ADD_TASK:
            return update(state, {$push: action.task});
        case DELETE_TASK:
            return update(state, {$splice: [[action.taskNo], 1]});
        default:
            return state;            
    }
}

export default task;