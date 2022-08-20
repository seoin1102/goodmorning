import React, { useEffect, useRef, useState } from "react";
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import { get, post, postJson } from '../../apis/Axios';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { setChat, addChat } from '../../redux/chat';
import Message from './Message';
import SendMessage from './SendMessage';

const Chat = () => {
    const client = useRef({});
    const authUser = JSON.parse(localStorage.getItem('authUser'))
    const [sendMessage, setSendMessage] = useState("");

    const dispatch = useDispatch();
    const [render, setRender] = useState(false);
    const [channelRender, setChannelRender] = useState(false);
    const crewList = useSelector(state => (state.crew), shallowEqual);
    const chatList = useSelector(state => (state.chat), shallowEqual);

    // 크루 렌더링 옵션
    useEffect(() => {
        setRender((prevRender) => true);
        return () => disconnect();
    }, [])

    useEffect(() => {
        if(render === false) {
            connect()
        }
    }, [render, crewList, dispatch]);

    // 자원 할당(소켓 연결)
    const connect = () => {
        client.current = new StompJs.Client({
            webSocketFactory: () => new SockJS("http://localhost:8080/ws-stomp"),
            connectHeaders: {"auth-token": "spring-chat-auth-token"},
            debug: function (str) {},
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: () => {
              initialSubscribe(2, 20, crewList)
            }, // 연결 직후 작동하는 이벤트
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
        console.log("@@@@@@@@@@@", crewList)
        await crewList.map(async (crew) => {
            // focus 안된 크루에 대한 메시지 알림 기능
            if(crew.no !== focusCrewNo) {
                client.current.subscribe(`/sub/${focusChannelNo}/${crew.no}`, (data) => {
                    console.log(crew.no)
                })
                return true;
            };
            
            // focus 된 [채널/크루]의 전체 메시지 리스트 DB에서 가져와 출력
            const getChatList = await get(`/chat/${focusCrewNo}`);
            console.log(`[${focusCrewNo}의 메시지 리스트]`, getChatList)
            dispatch(setChat(getChatList));

            // focus 된 크루의 다른 사용자가 입력한 메시지 추가(구독 이벤트 등록)
            client.current.subscribe(`/sub/${focusChannelNo}/${focusCrewNo}`, (data) => {
                //dispatch(addChat(JSON.parse(data.body)));
            })
        })
    };

    const publish = async(focusChannelNo, focusCrewNo = 20) => {
        if (!client.current.connected) 
            return;

        const addChat = JSON.stringify({
            crewNo: focusCrewNo,
            userNo: authUser.no,
            sendDate: '',
            message: sendMessage
        })

        const result = await postJson(`/chat/${focusCrewNo}/${authUser.no}`, addChat);

        // 채팅 DB INSERT 성공 시
        if(result.data === 'success') {
            const pubChat = JSON.stringify({
                type: 'CHAT',
                channel: focusChannelNo,
                crew: focusCrewNo,
                message: sendMessage,
                sender: authUser.no
            })

            client.current.publish({
                destination: `/pub/${focusChannelNo}/${focusCrewNo}`, 
                body: pubChat
            });
        }

        setSendMessage("");
    };

    return (
        <>
            <Message chatList={chatList}/>
            <SendMessage 
              onChangeHandler={(e) => setSendMessage(e.target.value)}
              onClickHandler={publish}
              />
        </>
    );
};

export default Chat;