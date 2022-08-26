import React from 'react';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function MessageItem({align, message, time, name}) {
    return (
        <ListItem key="1" >
            <Grid container spacing={2}>
                <Grid item xs={12} >
                    <ListItemText align={align} >{name}  {time}</ListItemText>
                    <ListItemText align={align} primary={message} sx={{}}></ListItemText>
                    <ListItemText align={align} secondary={time}></ListItemText>
                </Grid>
            </Grid>
        </ListItem>
    );
}

export default React.memo(MessageItem);