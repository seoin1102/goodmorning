/**
 * 
 * @param {*} type 'CHAT' 'ENTER' 'DM' 'FILE' 'JENKINS' 'GITHUB' 'PROJECT' 'TASK'
 * @param {*} crewNo 포커스된 크루 no [TOPIC]
 * @param {*} userNo 채팅을 보낼 유저 default: 자기자신 / JENKINS, GITHUB일 경우 크루장
 * @param {*} message 채팅 내용
 * @returns JSON.stringify [chatVo] 객체
 */

const defaultMsg = (crewNo, userNo, message='', userName) => ({
    crewNo: crewNo,
    userNo: userNo,
    message: message,
    userName: userName
});

/**
 * 
 * @param {*} crewNo 현재 포커스 중인 크루 번호
 * @param {*} userNo 현재 로그인 중인 유저 번호
 * @param {*} message 채팅 테이블에 저장될 메시지
 * @returns 
 */
export const chatVo = (crewNo, userNo, message) => {
    const msg = defaultMsg(crewNo, userNo, message);
    return JSON.stringify({
        ...msg, 
        type: 'CHAT'
    });
}

/**
 * 
 * @param {*} crewNo 현재 포커스 중인 크루 번호
 * @param {*} userName 현재 로그인 중인 유저 이름
 * @param {*} userNo 현재 로그인 중인 유저 번호
 * @returns [ENTER] JSON.stringify 객체
 */
export const msgEnter = (crewNo, userNo, userName) => {
    const msg = defaultMsg(crewNo, userNo, `${userName} 님이 입장하였습니다.`, userName);
    return JSON.stringify({
        ...msg, 
        type: 'ENTER',
        sendDate: new Date(+new Date() + 3240 * 10000).toISOString().split("T")[0]
    });
}

/**
 * 
 * @param {*} crewNo 현재 포커스 중인 크루 번호
 * @param {*} userNo 현재 로그인 중인 유저 번호
 * @param {*} message 크루를 구독중인 유저 전부에게 보낼 메시지
 * @returns [CHAT] JSON.stringify 객체
 */
export const msgChat = (crewNo, userNo, message, userName) => {
    const msg = defaultMsg(crewNo, userNo, message, userName);
    return JSON.stringify({
        ...msg,
        type: 'CHAT',
        sendDate: new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ")
    });
}

/**
 * 
 * @param {*} crewNo 현재 포커스 중인 크루 번호
 * @param {*} userNo 현재 로그인 중인 유저 번호
 * @returns [CONNECT] JSON.stringify 객체
 */
export const msgConnect = (crewNo, userNo, userName) => {
    const msg = defaultMsg(crewNo, userNo, userName);
    return JSON.stringify({
        ...msg, 
        type: 'CONNECT'
    });
}