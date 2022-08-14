import { combineReducers } from 'redux';
import channel from './channel';
import crew from './crew';
import task from './task';

const rootReducer = combineReducers({
    channel,
    crew,
    task
});

export default rootReducer;