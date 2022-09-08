import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import * as StompJs from "@stomp/stompjs";
import React, { useEffect, useRef, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as SockJS from "sockjs-client";
import { get, postJson, putUrl } from '../../apis/Axios';
import { chatVo, msgChat, msgConnect, chatPreviewVo, msgPreview } from '../../apis/ChatVo.js';
import { getLocalStorageAuthUser } from '../../apis/Fetch';
import { addChat, setChat } from '../../redux/chat';
import { addCHATALARM, resetCHATALARM, setCHATALARM, updateCHATALARM } from '../../redux/chatAlarm';
import '../../styles/css/SiteLayout.css';
import Chat from '../chat/Chat';
import Header from '../common/Header';
import Navigation from '../common/Navigation';
import Project from '../calendar/Project';

function SiteLayout({children}) {
    const client = useRef({});
    const authUser = getLocalStorageAuthUser();
    
    const [sendMessage, setSendMessage] = useState("");

    const dispatch = useDispatch();
    //const channelNo = useSelector(state => (state.focus.channelNo), shallowEqual);
    //const crewList = useSelector(state => (state.crew), shallowEqual);
    const chatList = useSelector(state => (state.chat), shallowEqual);
    const { crewNo } = useSelector(state => (state.focus), shallowEqual);
    
    useEffect(() => {
        connect()
        
        return () => {
            disconnect()};
    }, [crewNo]);

    // 자원 할당(소켓 연결)
    const connect = () => {
        client.current = new StompJs.Client({

            webSocketFactory: () => new SockJS("http://34.64.235.225:8080/ws-stomp"),


            debug: function (str) {},
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: () => {initialSubscribe()}, // 연결 직후 작동하는 이벤트 
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
    const initialSubscribe = async() => {
        const crewList = await get(`/crew/${authUser.no}`);

        dispatch(resetCHATALARM());
        await crewList.map(async (crew) => {
            const connectChat = msgConnect(crew.no, authUser.no);
            
            // 레디스 리스너 추가용
            client.current.publish({destination: `/pub/chat`, body: connectChat});
            // 공통 영역

            // focus 안된 크루에 대한 메시지 알림 기능
            if(crew.no !== crewNo) {
                // 이전 안읽은 메시지 카운트 가져오고
                const result = await get(`/chat/count/${crew.no}/${authUser.no}`);
                // console.log("###########어떻게 받아오는거야ㅑㅑ", result)
                dispatch(addCHATALARM({crewNo:crew.no, count:result.unReadCount, channelNo:result.channelNo}));
                client.current.subscribe(`/sub/${crew.no}`, () => {dispatch(updateCHATALARM({crewNo:crew.no}))})

                return;
            };

            // focus 된 [채널/크루]의 전체 메시지 리스트 DB에서 가져와 출력
            const getChatList = await get(`/chat/${crewNo}`);
            dispatch(setChat(getChatList));
            dispatch(setCHATALARM({crewNo:crewNo}))
            // 읽음 업데이트
            await putUrl(`/chatUser/${crewNo}/${authUser.no}`);

            // focus 된 크루의 다른 사용자가 입력한 메시지 추가(구독 이벤트 등록)
            client.current.subscribe(`/sub/${crewNo}`,async (data) => {
                
                    console.log("yyyyyyyyyyyyyyyy", data.body);

                const result = await putUrl(`/chatUser/${crewNo}/${authUser.no}`);

                if(result.data !== 'success') 
                    return;

                dispatch(addChat(JSON.parse(data.body)));
                dispatch(setCHATALARM({crewNo:crewNo}))            
            })

            return;
        })
    };

    //  해당 크루에 속한 사람 전부에게 메시지 보내기(메시지 객체 생성 -> DB 저장 -> STOMP 통신))
    const publish = async() => {
        if (!client.current.connected) 
            return;

        // 메시지 공백이면 보내지 않기
        if (sendMessage === '')
            return;

        //  메시지 객체 생성
        const addChat = chatVo(crewNo, authUser.no, sendMessage);

        //  DB 저장
        const result = await postJson(`/chat/${crewNo}/${authUser.no}`, addChat);

        // console.log("*************", result)
        // DB INSERT 성공 시 STOMP 통신
        if(result.data !== 'success')
            return;
        
        const pubChat = msgChat(crewNo, authUser.no, sendMessage, authUser.name);
        client.current.publish({destination: `/pub/chat`, body: pubChat});
        
        setSendMessage("");
    };

    const publishLinkPreview = async(gitName, repoName) => {
        if (!client.current.connected) 
          return;

          // 메시지 객체 생성 및 DB 저장
          const addChat = chatPreviewVo(crewNo, authUser.no, `${gitName}/${repoName}`);
          const result = await postJson(`/chat/${crewNo}/${authUser.no}`, addChat);

          // DB INSERT 성공 시 STOMP 통신
          if(result.data !== 'success')
            return;
          
          const pubChat = msgPreview(crewNo, authUser.no, `${gitName}/${repoName}`, authUser.name);
          client.current.publish({destination: `/pub/chat`, body: pubChat});
    }

    ///// 시창이 코드 넣을 곳 ///////////

    ///////////////////////////
    return (
        <div>
            <Grid container component={Paper}>
                <Header/>
                <Navigation/>
                {
                    (children.type === Chat) ? 
                    <Chat 
                        chatList={chatList} 
                        sendMessage={sendMessage} 
                        setSendMessage={setSendMessage} 
                        publish={publish}
                        /> :
                    (
                        (children.type === Project) ?
                        <Project 
                            publishLinkPreview={publishLinkPreview}
                            />:
                        children
                    )
                }
            </Grid>
        </div>
    );
}

export default SiteLayout;