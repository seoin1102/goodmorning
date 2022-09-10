import { Grid } from "@mui/material";
import React from "react";
import ChatHeader from "./ChatHeader";
import Message from './Message';
import SendMessage from './SendMessage';

const Chat = ({ chatList, sendMessage, setSendMessage, publish, publishFileUpload}) => {
    
    return (
        
        <Grid item xs={10}>
            <ChatHeader/>
            <Message chatList={chatList}/>
            <SendMessage 
                onChangeHandler={(e) => setSendMessage(e.target.value)}
                onClickHandler={publish}
                text={sendMessage}
                publishFileUpload={publishFileUpload}
                />
        </Grid>
    );
};

export default Chat;