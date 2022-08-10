import { combineReducers } from 'redux';
import channel from './channel';
import crew from './crew';

const rootReducer = combineReducers({
    channel,
    crew
});

export default rootReducer;