import { combineReducers } from 'redux';
import channel from './channel';
import crew from './crew';
import task from './task';
import sign from './sign';
import focus from './focus';
import chat from './chat';
import crewUser from './crewUser';
import project from './project';
import chatAlarm from './chatAlarm';

const rootReducer = combineReducers({
    channel,
    crew,
    task,
    sign,
    focus,
    chat,
    crewUser,
    project,
    chatAlarm
});

export default rootReducer;