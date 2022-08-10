import update from 'react-addons-update';
/**
 * 액션 타입 만들기
 */
const SET_CREW = 'crew/SET_CREW';
const ADD_CREW = 'crew/ADD_CREW';
const DELETE_CREW = 'crew/DELETE_CREW';
/**
 * @param {object} crews 채널에 속한 크루 목록
 */
export const setCrew = (crews) => ({ type: SET_CREW, crews});

/**
 * @param {object} crew 채널에 추가될 크루 
 */
export const addCrew = (crew) => ({ type: ADD_CREW, crew});

/**
 * @param {number} crewIndex 삭제할 크루의 인덱스
 */
export const deleteCrew = (crewIndex) => ({ type: DELETE_CREW, crewIndex})
/**
 * 초기 상태 선언
 */
const initialState = [{name:0, roomId:0}];

/**
 * 리듀서 선언
 */
const crew = (state = initialState, action) => {
    switch(action.type) {
        case SET_CREW:
            return update(state, {$push: action.crews});
        case ADD_CREW:
            return update(state, {$push: action.crew});
        case DELETE_CREW:
            return update(state, {$splice: [[action.crewIndex], 1]});
        default:
            return state;
    }
}

export default crew;
