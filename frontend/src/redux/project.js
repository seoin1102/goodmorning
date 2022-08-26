import update from 'react-addons-update';

const SET_PROJECT = 'project/SET_PROJECT';
const ADD_PROJECT = 'project/ADD_PROJECT';
const DELETE_PROJECT = 'project/DELETE_PROJECT';
const UPDATE_PROJECT = 'project/UPDATE_PROJECT';

// export const changeProject = (changeProject) => ({ type: CHANGE_PROJECT, changeProject });
export const setProject = (projects) => ({ type: SET_PROJECT, projects });
export const addProject = (project) => ({ type: ADD_PROJECT, project });
export const deleteProject = (id) => ({ type: DELETE_PROJECT, id });
export const updateProject = (id, project) => ({ type: UPDATE_PROJECT, id, project})

const initialState = []

const project = (state = initialState, action) => {

    switch (action.type) {
        // case CHANGE_PROJECT:
        //     let newCalendarEvents = [...state];
        //     const clickedEventIdx = newCalendarEvents.findIndex(
        //         (event) => event.id == action.project.id
        //       );
        //     newCalendarEvents[clickedEventIdx] = {...newCalendarEvents[clickedEventIdx],...action.project}
        //     return update(state, { $set: newCalendarEvents});
        case SET_PROJECT:
            return state.concat(action.projects);    
        case ADD_PROJECT:
            return update(state, { $push: action.project });
        case DELETE_PROJECT:  
            return update(state, { $splice: [[action.id, 1]] });
        case UPDATE_PROJECT:
            return update(state, { [action.id]: { $set: action.project }})
        default:
            return state;
    }
}

export default project;