import update from 'react-addons-update';

const SET_NOTIFICATION = 'notification/SET_NOTIFICATION';
const ADD_NOTIFICATION = 'notification/ADD_NOTIFICATION';
const DELETE_NOTIFICATION = 'notification/DELETE_NOTIFICATION';

export const setNotification = (notifications) => ({ type: SET_NOTIFICATION, notifications});
export const addNotification = (notification) => ({ type: ADD_NOTIFICATION, notification});
export const deleteNotification = (notificationNo) => ({ type: DELETE_NOTIFICATION, notificationNo});

const initialState = []

const notification = (state = initialState, action) => {
    switch(action.type) {
        case SET_NOTIFICATION:
            return update(state, {$set: action.notifications});
        case ADD_NOTIFICATION:
            return update(state, {$push: action.notification});
        case DELETE_NOTIFICATION:
            return update(state, {$splice: [[action.notificationNo], 1]});
        default:
            return state;
    }
}

export default notification;