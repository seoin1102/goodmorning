import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';

function SendMessage() {
    return (
        <Grid container style={{ padding: '20px' }}>
            <Grid item xs={11}>
                <TextField id="outlined-basic-email" label="Type Something" fullWidth />
            </Grid>
            <Grid item xs={1} align="right">
                <Fab color="primary" aria-label="add"><SendIcon /></Fab>
            </Grid>
        </Grid>
    );
}

export default React.memo(SendMessage);