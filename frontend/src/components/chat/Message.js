import React, { Fragment, useEffect } from 'react';
import MessageItem from './MessageItem';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';

function Message({chatList}) {
    const  a= 'aaaaa bb';
    console.log("%%%%%%", a.split(" ")[0], typeof a)
   
    return (
    <>
        <List style={{ height: '700px', overflow: 'auto', backgroundColor:'#f7f7fa' }}>
            {chatList.map((chat, index, array) =>{
                if(chatList !== undefined && chat.sendDate !== undefined){  
                    const date = chat.sendDate.split(" ")[0];
                    const time = chat.sendDate.split(" ")[1].substring(0, 5);
                    let dateDivider;

                    if(array.length > index + 1) {
                       if (chat.sendDate.split(" ")[0] !== array[index + 1].sendDate.split(" ")[0]){
                        dateDivider = <Divider> {date}</Divider>
                       }
                       else null;       
                    }
                
                    return (<Fragment key={index}>
                                {dateDivider}
                                <MessageItem 
                                    align={"left"}
                                    message={chat.message} 
                                    time={time}
                                    name={chat.userName} 
                                    />
                            </Fragment>)
                }
            })}
        </List>
        <Divider />
    </>
    );
}

export default React.memo(Message);