import { combineReducers } from 'redux';
import channel from './channel';
import crew from './crew';
import task from './task';
import sign from './sign';

const rootReducer = combineReducers({
    channel,
    crew,
    task,
    sign 
});

export default rootReducer;