import React from 'react';
import SiteLayout from '../components/layout/SiteLayout';
import Grid from '@mui/material/Grid';
import Chat from '../components/chat/Chat';


function chat() {

    return (
        <SiteLayout>
            <Grid item xs={10}>
                <Chat />
            </Grid>
        </SiteLayout>
    );
}

export default chat;