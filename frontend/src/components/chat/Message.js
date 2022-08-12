import React from 'react';
import MessageItem from './MessageItem';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';

function Message() {
    return (
    <>
        <List style={{ height: '700px', overflow: 'auto' }}>
            {/*
                메시지 리스트 받아오면 map으로 반복하기
                messagesData.map((massage, index) => {<MessageItem message={message} key={index}/>}) 
            */}
            <MessageItem align={"right"} text={"Cool. i am good, let's catch up!"} time={"09:31"} />
            <MessageItem align={"left"} text={"Cool. i am good, let's catch up!"} time={"09:31"} />
            <MessageItem align={"right"} text={"Cool. i am good, let's catch up!"} time={"09:31"} />
            <MessageItem align={"right"} text={"Cool. i am good, let's catch up!"} time={"09:31"} />
            <MessageItem align={"right"} text={"Cool. i am good, let's catch up!"} time={"09:31"} />
            <MessageItem align={"right"} text={"Cool. i am good, let's catch up!"} time={"09:31"} />
            <MessageItem align={"left"} text={"Cool. i am good, let's catch up!"} time={"09:31"} />
            <MessageItem align={"left"} text={"Cool. i am good, let's catch up!"} time={"09:31"} />
            <MessageItem align={"right"} text={"Cool. i am good, let's catch up!"} time={"09:31"} />
            <MessageItem align={"right"} text={"Cool. i am good, let's catch up!"} time={"09:31"} />
            <MessageItem align={"left"} text={"Cool. i am good, let's catch up!"} time={"09:31"} />
            <MessageItem align={"right"} text={"Cool. i am good, let's catch up!"} time={"09:31"} />
            <MessageItem align={"right"} text={"Cool. i am good, let's catch up!"} time={"09:31"} />

        </List>
        <Divider />
    </>
    );
}

export default React.memo(Message);