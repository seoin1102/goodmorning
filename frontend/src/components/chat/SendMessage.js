import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Button } from '@mui/material';

function SendMessage() {
    return (
        <>
        <Grid container style={{ padding: '10px 30px 10px 20px'}}>
            <Grid item xs={11} style={{direction:'rtl'}}>
                <Button variant="outlined" component="label">
                <AttachFileIcon/>Upload  
                    <input hidden accept="image/*" multiple type="file" />
                </Button>
            </Grid>
        </Grid>
        <Grid container style={{ padding: '0px 30px 10px 20px' }}>
            <Grid item xs={11}>
                <TextField id="outlined-basic-email" label="Type Something" fullWidth />
            </Grid>
            <Grid item xs={1} align="right">
                <Fab color="primary" aria-label="add"><SendIcon /></Fab>
                {/* <Dropdown as={ButtonGroup}>
                    <Button variant="success">보내기</Button>

                    <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">메시지 예약</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown> */} 
            </Grid>
        </Grid>
        </>
    );
}

export default React.memo(SendMessage);