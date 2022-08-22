import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';

import { Button } from '@mui/material';


function SendMessage({onChangeHandler, onClickHandler, text}) {
    return (
        <>
        <Grid container style={{ padding: '10px 30px 10px 20px'}}>
            <Grid item xs={11} style={{direction:'rtl'}}>
                <Button variant="outlined" component="label">
                Upload  
                    <input hidden accept="image/*" multiple type="file" />
                </Button>
            </Grid>
        </Grid>
        <Grid container style={{ padding: '0px 30px 10px 20px' }}>
            <Grid item xs={11}>
                <TextField
                  onChange={onChangeHandler}
                  id="outlined-basic-email" 
                  label="Type Something" 
                  fullWidth
                  onKeyDown={(e) => { if(e.key === 'Enter') onClickHandler() }}
                  value={text}
                  />
            </Grid>
            <Grid item xs={1} align="right">
                <Fab 
                  color="primary" 
                  aria-label="add"
                  onClick={onClickHandler}
                  >
                  {"보내기"}
                </Fab>
            </Grid>
        </Grid>
        </>
    );
}

export default React.memo(SendMessage);