import React from 'react';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import { borderRadius } from '@mui/system';
import { DAY_SIZE } from '@mui/x-date-pickers/internals/constants/dimensions';

function HeaderSearch() {

  return (
      <Grid item xs={7}>
          <List>
              <TextField 
              id="outlined-basic-email" 
              label="Search"
              sx={{
                input: {
                    color: "black",
                    height: '20px',
                    border: '2px solid white', 
                    borderRadius: '7px', 
                    backgroundColor: 'white'
                }
              }}
              fullWidth />
          </List>
          <Divider />
      </Grid>
  );
}

export default React.memo(HeaderSearch);