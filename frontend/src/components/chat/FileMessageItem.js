import { Avatar, ListItemIcon } from '@mui/material';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import React, { useEffect, useState } from 'react';
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
                    <div style={{height: '100px'}}></div>
                </Grid>
                <Grid item xs={11.5} style={{width:'max-content', padding:'10px 50px 10px 30px', borderColor: 'black'}} >
                    <Grid container spacing={1} >
                        <Grid item xs={12} >
                            <ListItemText align={align} style={{fontWeight:'bolder'}} >{name}  {time}</ListItemText>
                        </Grid>
                        <Grid item xs={12} >
                            <Grid item xs={1} sx={{backgroundColor: 'black', borderRadius: '10px', borderWidth: '1px', padding: '0'}}>
                                <div style={{height: '65px', padding: '0'}}></div>
                            </Grid>
                            <Grid item xs={11} sx={{display: 'flex'}}>
                                <Grid item xs={12}>
                                    <div style={{padding: '0 0 0 10px', margin: '0 0 8px 0'}}>
                                      {`${messageItem.name}`}
                                    </div>
                                </Grid>
                                <Grid item xs={1}>
                                    <div style={{margin: '0 0 8px 0', backgroundColor: '#e8ebed', border: '1px solid #E1E1E9', color: 'red', borderRadius: '5px'}}>
                                      {`${messageItem.size}KB`}
                                    </div>
                                </Grid>
                                <Grid item xs={11}>
                                    <ListItemText align={align} primary={messageItem.type}  sx={{fontFamily:'SUIT-Medium'}}/>                         
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </ListItem>
    );
}

export default React.memo(FileMessageItem);