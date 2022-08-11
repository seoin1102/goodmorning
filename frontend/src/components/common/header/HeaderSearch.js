import React from 'react';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';

export default function HeaderSearch() {
  return (
      <Grid item xs={5}>
          <List>
              <TextField 
              id="outlined-basic-email" 
              label="Search" 
              variant="outlined" 
              style={{ height: '60px' }} 
              fullWidth />
          </List>
          <Divider />
      </Grid>
  );
}