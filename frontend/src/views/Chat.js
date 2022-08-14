import React from 'react';
import SiteLayout from '../components/layout/SiteLayout';
import Grid from '@mui/material/Grid';
import Message from '../components/chat/Message';
import SendMessage from '../components/chat/SendMessage';


function chat() {

    return (
        <SiteLayout>
            <Grid item xs={10}>
                <Message />
                <SendMessage />
            </Grid>
        </SiteLayout>
    );
}

export default chat;