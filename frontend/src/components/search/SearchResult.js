import Divider from '@mui/material/Divider';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import List from '@mui/material/List';
import React, { Fragment, useCallback, useEffect, useRef } from 'react';
import MessageItem from '../chat/MessageItem';
import SendPreviewMessage from '../chat/SendPreviewMessage'; 
import { useLocation } from "react-router-dom";

function SearchResult() {
    const searchList = useSelector(state => (state.search), shallowEqual);
    console.log(searchList)
    const location = useLocation();
    const { state } = location;
    const searchText = state.search;
    const scrollRef = useRef();
    const scrollToBottom = useCallback(() => {
        scrollRef.current.scrollIntoView({behavior: 'smooth', block: "center"})
    }, [searchList])

    useEffect (() => {scrollToBottom()}, [searchList])
    
    return (
    <>
        <List style={{ height: '650px', overflow: 'auto', backgroundColor:'#f7f7fa' }}>
            {searchList.map((chat, index, array) =>{
                if(searchList !== undefined && chat.sendDate !== undefined){  
                    const date = chat.sendDate.split(" ")[0];
                    const time = chat.sendDate.split(" ")[1].substring(0, 5);
                    let dateDivider;
                    
                    if(array.length > index + 1) {
                        if (chat.sendDate.split(" ")[0] !== array[index + 1].sendDate.split(" ")[0]){
                            dateDivider = <Divider>{date.slice(0, date.length - 1) + String(Number(date.charAt(date.length-1)) + 1)}</Divider>
                        }
                        else null;
                    }

                    return (<div><Fragment key={index}>
                                {chat.type === 'CHAT' ?
                                    <MessageItem 
                                        align={"left"}
                                        message={chat.message} 
                                        time={time}
                                        name={chat.userName}
                                        url={chat.profileUrl}
                                        /> :
                                null}
                                {chat.type === 'PREVIEW' ?
                                    <SendPreviewMessage
                                        message={chat.message}/> :
                                null}
                                {dateDivider}
                            </Fragment>
                            
                            {chat.message==searchText? <div style={{border:'0.001px solid #bdbdbd'}}><div ref={scrollRef}/></div>:<div></div>}
                            </div>)
                }
                 })}

        </List>
        <Divider />
    </>
    );
}

export default React.memo(SearchResult);