import { combineReducers } from 'redux';
import channel from './channel';
import crew from './crew';
import task from './task';
import sign from './sign';
import focus from './focus';

const rootReducer = combineReducers({
    channel,
    crew,
    task,
    sign,
    focus
});

export default rootReducer;