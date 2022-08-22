import React, { useEffect, useRef, useState } from "react";
import ChatHeader from "./ChatHeader";
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import { get, post } from '../../apis/Axios';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { setChat, addChat } from '../../redux/chat';
import Message from './Message';
import SendMessage from './SendMessage';

const Chat = () => {
    const client = useRef({});
    const authUser = localStorage.getItem('authUser');
    const [sendMessage, setSendMessage] = useState("");

    const dispatch = useDispatch();
    const crewList = useSelector(state => (state.crew), shallowEqual);
    const chatList = useSelector(state => (state.chat), shallowEqual);

    useEffect(() => {
        connect();
        return () => disconnect();
    }, []);

    // 자원 할당(소켓 연결)
    const connect = () => {
        client.current = new StompJs.Client({
            webSocketFactory: () => new SockJS("http://localhost:8080/ws-stomp"),
            connectHeaders: {
              "auth-token": "spring-chat-auth-token",
            },
            debug: function (str) {console.log("[DEBUG]", str)},
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: () => {initialSubscribe(1, 1, crewList)}, // 연결 직후 작동하는 이벤트
            onStompError: (frame) => {console.error("[ERROR]", frame)},
        });

        client.current.activate();
    };

    // 자원 해제
    const disconnect = () => {client.current.deactivate()};

    /**
     * 유저가 로그인 후 자기가 속한 크루에 대한 채팅 및 알림 세팅
     * @param {number} focusChannelNo 현재 focus 된 채널
     * @param {number} focusCrewNo 현재 focus 된 크루
     * @param {object} crewList 구독 중인 크루 리스트
     */
    const initialSubscribe = async(focusChannelNo, focusCrewNo, crewList) => {
        crewList.map((crew) => {
            // focus 안된 크루에 대한 메시지 알림 기능
            if(crew.crewNo !== focusCrewNo) {
                client.current.subscribe(`/sub/${focusChannelNo}/${crew.crewNo}`, (data) => {
                    //dispatch notification 해주기
                })
            };
            
            // focus 된 [채널/크루]의 전체 메시지 리스트 DB에서 가져와 출력
            dispatch(setChat(await get(`/chat/${focusChannelNo}/${focusCrewNo}`)));

            // focus 된 크루의 다른 사용자가 입력한 메시지 추가(구독 이벤트 등록)
            client.current.subscribe(`/sub/${focusChannelNo}/${focusCrewNo}`, (data) => {
                dispatch(addChat(JSON.parse(data.body)));
            })
        })
    };

    const publish = (focusChannelNo, focusCrewNo) => {
        if (!client.current.connected) 
            return;

        client.current.publish({
            destination: `/pub/${focusChannelNo}/${focusCrewNo}`,
            body: JSON.stringify({
                type: 'CHAT',
                channel: focusChannelNo,
                crew: focusCrewNo,
                message: sendMessage,
                sender: authUser.no
            })
        });

        setSendMessage("");
    };

    return (
        <>
            <ChatHeader/>
            <Message chatList={chatList}/>
            <SendMessage 
              onChangeHandler={(e) => setSendMessage(e.target.value)}
              onClickHandler={publish}
              text={sendMessage}
              />
        </>
    );
};

export default Chat;