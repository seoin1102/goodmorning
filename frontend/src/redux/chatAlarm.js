import update from 'react-addons-update';

const SET_CHAT_ALARM = 'chatalarm/SET_CHAT_ALARM';
const ADD_CHAT_ALARM = 'chatalarm/ADD_CHAT_ALARM';
const UPDATE_CHAT_ALARM = 'chatalarm/UPDATE_CHAT_ALARM';

export const setCHATALARM = (chatalarms) => ({ type: SET_CHAT_ALARM, chatalarms});
export const addCHATALARM = (chatalarm) => ({ type: ADD_CHAT_ALARM, chatalarm});
export const updateCHATALARM = (chatalarm) => ({ type: UPDATE_CHAT_ALARM, chatalarm});

const initialState = [{
    crewNo:null,
    count:0,
    subId: null
}];

const chatAlarm = (state = initialState, action) => {
    switch(action.type) {
        case SET_CHAT_ALARM:
            return [].concat(action.chatalarms);
        case ADD_CHAT_ALARM:
            return state.concat(action.chatalarm);
        case UPDATE_CHAT_ALARM:
            return state.map((chatalarm) => {
                if(chatalarm.crewNo === action.chatalarm.crewNo)
                chatalarm.count =+ 1;            
                return chatalarm;
            })
        default:
            return state;
    }
}

export default chatAlarm;