import React from 'react';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import hash2 from '../../assets/icons/user.png';
import { Avatar, ListItemIcon } from '@mui/material';

function MessageItem({align, message, time, name}) {
    return (
        <ListItem key="1" >
            <Grid container spacing={1}>
                <Grid item xs={0.5} >
                    <ListItemIcon sx={{padding: "7px 0 0 0"}}>
                    {/* <img src={hash2}/> */}
                        <Avatar alt={"null"} src={hash2} />
                    </ListItemIcon>
                </Grid>
                <Grid item xs={11.5}>
                    <ListItemText align={align} >{name}  {time}</ListItemText>
                    <ListItemText align={align} primary={message} sx={{}}></ListItemText>
                </Grid>
            </Grid>
        </ListItem>
    );
}

export default React.memo(MessageItem);