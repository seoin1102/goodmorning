import { combineReducers } from 'redux';
import channel from './channel';
import crew from './crew';
import task from './task';
import sign from './sign';
import focus from './focus';
import chat from './chat';
import crewUser from './crewUser';
import project from './project';

const rootReducer = combineReducers({
    channel,
    crew,
    task,
    sign,
    focus,
    chat,
    crewUser,
    project
});

export default rootReducer;