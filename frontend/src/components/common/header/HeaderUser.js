import React from 'react';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';

export default function HeaderUser() {
    return (
        <Grid item xs={3}>
            <List>
                <ListItem button key="RemySharp" style={{ height: '60px' }}>
                    <ListItemIcon>
                        <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                    </ListItemIcon>
                </ListItem>
            </List>
            <Divider />
        </Grid>
    );
}