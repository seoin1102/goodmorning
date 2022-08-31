import React from 'react';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { TabContent } from 'react-bootstrap';
import '../../styles/css/msItem.css';
import '../../assets/fonts/font.css'
function MessageItem({align, message, time, name}) {
    return (
        <ListItem key="1" >
            <Grid container spacing={2} >
                <Grid item style={{width:'max-content', padding:'10px 50px 10px 30px', fontFamily:'SongMyung'}} >
                    <ListItemText align={align} style={{fontWeight:'bolder', fontFamily:'SongMyung'}} >{name}  {time}</ListItemText>
                    <ListItemText align={align} primary={message} sx={{}} ></ListItemText>
                    {/* <ListItemText align={align} secondary={time}></ListItemText> */}
                </Grid>
            </Grid>
        </ListItem>
    );
}

export default React.memo(MessageItem);