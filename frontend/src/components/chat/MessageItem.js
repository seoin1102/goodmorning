import React from 'react';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function MessageItem({align, text, time}) {
    return (
        <ListItem key="1">
            <Grid container>
                <Grid item xs={12}>
                    <ListItemText align={align} primary={text}></ListItemText>
                </Grid>
                <Grid item xs={12}>
                    <ListItemText align={align} secondary={time}></ListItemText>
                </Grid>
            </Grid>
        </ListItem>
    );
}

export default React.memo(MessageItem);