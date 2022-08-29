import { Grid } from "@mui/material";
import React, { useState } from "react";
import ChatHeader from "./ChatHeader";
import Message from './Message';
import SendMessage from './SendMessage';
import axios from "axios";
import { fetchResponse, checkResponse, getfile, getLocalStorageAuthUser, addFile, fileDownload } from '../../apis/Fetch';

const Chat = ({ chatList, sendMessage, setSendMessage, publish}) => {

    return (
        
        <Grid item xs={10}>
            <ChatHeader/>
            <Message chatList={chatList}/>
            <SendMessage 
               onChangeHandler={(e) => setSendMessage(e.target.value)}
               onClickHandler={publish}
               text={sendMessage}
              />
        </Grid>
    );
};

export default Chat;