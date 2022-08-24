import React, { useEffect, useRef, useState } from "react";
import ChatHeader from "./ChatHeader";
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import { get, post, postJson } from '../../apis/Axios';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { setChat, addChat } from '../../redux/chat';
import Message from './Message';
import SendMessage from './SendMessage';

const Chat = () => {
    // const client = useRef({});
    // const authUser = JSON.parse(localStorage.getItem('authUser'))
    // const [sendMessage, setSendMessage] = useState("");

    // const dispatch = useDispatch();
    // const crewList = useSelector(state => (state.crew), shallowEqual);
    // const chatList = useSelector(state => (state.chat), shallowEqual);

    // useEffect(() => {
    //   console.log("useEffect 호출")
    //     connect()
    //     return () => disconnect();
    // }, [crewList]);

    // // 자원 할당(소켓 연결)
    // const connect = () => {
    //     client.current = new StompJs.Client({
    //         webSocketFactory: () => new SockJS("http://localhost:8080/ws-stomp"),
    //         connectHeaders: {"auth-token": "spring-chat-auth-token"},
    //         debug: function (str) {},
    //         reconnectDelay: 5000,
    //         heartbeatIncoming: 4000,
    //         heartbeatOutgoing: 4000,
    //         onConnect: () => {
    //           initialSubscribe(2, 20, crewList)
    //         }, // 연결 직후 작동하는 이벤트
    //         onStompError: (frame) => {console.error("[ERROR]", frame)},
    //     });

    //     client.current.activate();
    // };

    // // 자원 해제
    // const disconnect = () => {client.current.deactivate()};

    // /**
    //  * 유저가 로그인 후 자기가 속한 크루에 대한 채팅 및 알림 세팅
    //  * @param {number} focusChannelNo 현재 focus 된 채널
    //  * @param {number} focusCrewNo 현재 focus 된 크루
    //  * @param {object} crewList 구독 중인 크루 리스트
    //  */
    // const initialSubscribe = async(focusChannelNo, focusCrewNo, crewList) => {
    //     console.log("[크루 목록]", crewList)
    //     await crewList.map(async (crew, index) => {

    //         const enterChat = JSON.stringify({
    //             type: 'ENTER',
    //             crewNo: crew.no,
    //             userNo: authUser.no,
    //             sendDate: '',
    //             message: ''
    //         })
    //         // 레디스 리스너 추가용
    //         client.current.publish({
    //             destination: `/pub/chat`, 
    //             body: enterChat
    //         });

    //         // focus 안된 크루에 대한 메시지 알림 기능
    //         if(crew.no !== focusCrewNo) {
    //             client.current.subscribe(`/sub/${crew.no}`, (data) => {
    //                 //추후 작성
    //             })
    //             return true;
    //         };
      
    //         // focus 된 [채널/크루]의 전체 메시지 리스트 DB에서 가져와 출력
    //         const getChatList = await get(`/chat/${focusCrewNo}`);
    //         console.log(`[${focusCrewNo}번 크루의 메시지 리스트]`, getChatList)
    //         dispatch(setChat(getChatList));

    //         // focus 된 크루의 다른 사용자가 입력한 메시지 추가(구독 이벤트 등록)
    //         client.current.subscribe(`/sub/${focusCrewNo}`, (data) => {
    //             console.log("stomp로 받아오는 데이터!!!!!", data.body);
    //             dispatch(addChat(JSON.parse(data.body)));
    //         })
    //     })
    // };

    // const publish = async(focusChannelNo, focusCrewNo = 20) => {
    //     if (!client.current.connected) 
    //         return;

    //     if (sendMessage === '')
    //         return;

    //     const addChat = JSON.stringify({
    //         crewNo: focusCrewNo,
    //         userNo: authUser.no,
    //         sendDate: '',
    //         message: sendMessage
    //     })

    //     const result = await postJson(`/chat/${focusCrewNo}/${authUser.no}`, addChat);

    //     // 채팅 DB INSERT 성공 시
    //     if(result.data === 'success') {
    //         const pubChat = JSON.stringify({
    //             type: 'CHAT',
    //             crewNo: focusCrewNo,
    //             userNo: authUser.no,
    //             sendDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
    //             message: sendMessage
    //         })

    //         client.current.publish({
    //             destination: `/pub/chat`, 
    //             body: pubChat
    //         });
    //     }

    //     setSendMessage("");

    //     ///////////////////////////////
        
    // };
////////////////////////////////////////////////////////////

const addFile = async function(comment, file) {
    try {
        console.log("테스트 출력1 : " + comment);
        console.log("테스트 출력2 : " + file);
        
        // Create FormData
        const formData = new FormData();
        formData.append('comment', comment);
        formData.append('file', file);

        // Post
        const response = await fetch(`/api/fileManagement/upload`, {
            method: 'post',
            headers: { 
                'Accept': 'application/json'
            },
            body: formData
        });

        //  리스폰스 응답이 200인지 체크
        if (!response.ok) {
            throw `${response.status} ${response.statusText}`;
        }

        // 응답은 200인데 서버쪽에서 보낸게 성공인지 체크 
        const json = await response.json();
        if (json.result !== 'success') {
            throw json.message;
        }

        // 리랜더링(업데이트 해줘야함 나중에 추가 예정)
        //setImageList([json.data, ...imageList]);

    } catch (err) {
        console.error(err);
    }
};


const fileDownload = async function(fileName) {
    try {

        // Post
        const response = await fetch(`/api/fileManagement/upload`+fileName, {
            method: 'post',
            headers: { 
                'Accept': 'application/json'
            },
            body: fileName
        });

        //  리스폰스 응답이 200인지 체크
        if (!response.ok) {
            throw `${response.status} ${response.statusText}`;
        }

        // 응답은 200인데 서버쪽에서 보낸게 성공인지 체크 
        const json = await response.json();
        if (json.result !== 'success') {
            throw json.message;
        }

        // 리랜더링(업데이트 해줘야함 나중에 추가 예정)
        //setImageList([json.data, ...imageList]);
        
    } catch (err) {
        console.error(err);
    }
};


////////////////////////////////////////////////////////////
    return (
        <>
            {/* <ChatHeader/>
            <Message //chatList={chatList}
            /> */}
            <SendMessage 
            //   onChangeHandler={(e) => setSendMessage(e.target.value)}
            //   onClickHandler={publish}
            //   text={sendMessage}
              addFilecallback={addFile}
              />
        </>
    );
};

export default Chat;