import { Avatar, ListItemIcon } from '@mui/material';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import React, { useEffect, useState } from 'react';
import fileIcons from '../../assets/icons/file_2x.png';
import '../../assets/fonts/font.css';
import '../../styles/css/msItem.css';

function FileMessageItem({align, message, time, name, url}) {
    const [messageItem, setMessageItem] = useState({
        name: '',
        size: '',
        type: ''
    });

    useEffect(() => {
        const messageItemArray = message.split('#$#');

        setMessageItem((prevMessageItem) => ({
            ...prevMessageItem, 
            name: messageItemArray[0], 
            size: messageItemArray[1].slice(0, 0),
            type: messageItemArray[2]
          }))
    }, [message]);

  return (
        <ListItem key="1" >
            <Grid container spacing={1}>
                <Grid item xs={0.5} >
                    <ListItemIcon sx={{padding: "7px 0 0 0"}}>
                        <Avatar alt={"null"} src={url} />
                    </ListItemIcon>
                    <div style={{height: '50px'}}></div>
                </Grid>
                <Grid item xs={11.5} style={{width:'max-content', padding:'10px 50px 10px 30px', borderColor: 'black'}} >
                    <Grid container spacing={1} >
                        <Grid item xs={12} >
                            <ListItemText align={align} style={{fontWeight:'bolder'}} >{name}  {time}</ListItemText>
                        </Grid>
                        <Grid item xs={12} sx={{display: 'flex'}}>
                            <Grid item xs={1} sx={{height: '52px'}}>
                                <img src={fileIcons}/>
                            </Grid>
                            <Grid item xs={11}>
                                
                                    <div style={{padding: '0 0 0 10px', height: '26px', backgroundColor: '#e8ebed', border: '1px solid #E1E1E9', borderRadius: '5px'}}>
                                      {`${messageItem.name}`}
                                    </div>
                                    <div style={{height: '26px', backgroundColor: '#e8ebed', borderRadius: '5px', display: 'flex'}}>
                                        <div>
                                            {`${messageItem.size}KB`}
                                        </div>
                                        <div>
                                            {messageItem.type}
                                        </div>
                                    </div>
                              
                              
                                    <ListItemText align={align} primary={messageItem.type}  sx={{fontFamily:'SUIT-Medium'}}/>                         
                              
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </ListItem>
    );
}

export default React.memo(FileMessageItem);