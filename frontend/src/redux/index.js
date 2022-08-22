import { combineReducers } from 'redux';
import channel from './channel';
import crew from './crew';
import task from './task';
import sign from './sign';
import crewUser from './crewUser';

const rootReducer = combineReducers({
    channel,
    crew,
    task,
    sign,
    crewUser
});

export default rootReducer;