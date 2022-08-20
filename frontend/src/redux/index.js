import { combineReducers } from 'redux';
import channel from './channel';
import crew from './crew';
import task from './task';
import sign from './sign';
import focus from './focus';
import chat from './chat';

const rootReducer = combineReducers({
    channel,
    crew,
    task,
    sign,
    focus,
    chat
});

export default rootReducer;