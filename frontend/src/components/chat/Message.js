import React, { useEffect } from 'react';
import MessageItem from './MessageItem';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';

function Message({chatList}) {

    return (
    <>
        <List style={{ height: '700px', overflow: 'auto', backgroundColor:'#f7f7fa' }}>
            {chatList.map((chat, index) => 
                <MessageItem 
                    key={index} 
                    align={"right"} 
                    message={chat.message} 
                    time={chat.sendDate} 
                    />
            )}
        </List>
        <Divider />
    </>
    );
}

export default React.memo(Message);