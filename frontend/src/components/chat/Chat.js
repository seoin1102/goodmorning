import { Grid } from "@mui/material";
import React, { useState } from "react";
import ChatHeader from "./ChatHeader";
import Message from './Message';
import SendMessage from './SendMessage';
import axios from "axios";
import { fetchResponse, checkResponse, getfile } from '../../apis/Fetch';

const Chat = ({ chatList, sendMessage, setSendMessage, publish}) => {


const [downloadurl, setdownloadurl] = useState("");
const addFile = async function(comment, file) {
    try {
        // Create FormData
        const formData = new FormData();
        formData.append('comment', comment);
        formData.append('file', file);

        const response = await fetchResponse('/api/fileManagement/upload','post','multipartHeader',formData);
        const json = await checkResponse(response);

        // 리랜더링(업데이트 해줘야함 나중에 추가 예정)
        //setImageList([json.data, ...imageList]);

    } catch (err) {
        console.error(err);
    }
};

const fileDownload = async function(fileName) {
    try {
        
        const response = await fetchResponse('/api/fileManagement/download/'+fileName,'post','multipartHeader',fileName);
        const json = await checkResponse(response);

        // 리랜더링(업데이트 해줘야함 나중에 추가 예정)
        //setImageList([json.data, ...imageList]);

        const fileUrl = json.data.url;
        let getfileName = json.data.url;
        getfileName = fileName.split("/");

        setdownloadurl(fileUrl)
        getfile(fileUrl,getfileName);

    } catch (err) {
        console.error(err);
    }
};


    return (
        
        <Grid item xs={10}>
            <ChatHeader/>
            <Message chatList={chatList}/>
            <SendMessage 
               onChangeHandler={(e) => setSendMessage(e.target.value)}
               onClickHandler={publish}
               text={sendMessage}
               addFilecallback={addFile}
               fileDownloadcallback={fileDownload}
               downloadurl={downloadurl}
              />
        </Grid>
    );
};

export default Chat;