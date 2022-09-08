import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import React, { Fragment, useCallback, useEffect, useRef } from 'react';
import MessageItem from './MessageItem';
import GitMessageItem from './GitMessageItem';
import SendPreviewMessage from './SendPreviewMessage';
import githubIcon from '../../assets/icons/github.svg';
import jenkinsIcon from '../../assets/icons/jenkins.svg';

function Message({chatList}) {
    const scrollRef = useRef(null);
    const scrollToBottom = useCallback(() => {
        scrollRef.current.scrollIntoView({behavior: 'smooth'})
    }, [chatList])

    useEffect (() => {scrollToBottom()}, [chatList])

    return (
    <>
        <List style={{ height: '650px', overflow: 'auto', backgroundColor:'#f7f7fa' }}>
            {chatList.map((chat, index, array) =>{
                if(chatList !== undefined && chat.sendDate !== undefined){  
                    const date = chat.sendDate.split(" ")[0];
                    const time = chat.sendDate.split(" ")[1].substring(0, 5);
                    let dateDivider;
                    
                    if(array.length > index + 1) {
                        if (chat.sendDate.split(" ")[0] !== array[index + 1].sendDate.split(" ")[0]){
                            dateDivider = <Divider>{array[index + 1].sendDate.split(" ")[0]}</Divider>
                        }
                        else null;
                    }

                    return (<Fragment key={index}>
                                {(chat.type === 'CHAT') ?
                                    <MessageItem 
                                        align={"left"}
                                        message={chat.message} 
                                        time={time}
                                        name={chat.userName}
                                        url={chat.profileUrl}/> :
                                null}
                                {(chat.type === 'GITHUB') ?
                                    <GitMessageItem 
                                        align={"left"}
                                        message={chat.message} 
                                        time={time}
                                        name={"GITHUB"}
                                        url={githubIcon}/> :
                                null}
                                {(chat.type === 'JENKINS') ?
                                    <MessageItem 
                                        align={"left"}
                                        message={chat.message} 
                                        time={time}
                                        name={'JENKINS'}
                                        url={jenkinsIcon}/> :
                                null}
                                {chat.type === 'PREVIEW' ?
                                    <SendPreviewMessage
                                        message={chat.message}/> :
                                null}
                                {dateDivider}
                            </Fragment>)
                }
            })}
            <div ref={scrollRef}></div>
        </List>
        <Divider />
    </>
    );
}

export default React.memo(Message);