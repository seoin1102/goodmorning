import React from 'react';
import SiteLayout from '../components/layout/SiteLayout';
import Task from '../components/calendar/Task'
import { Grid } from '@mui/material';

function Calendar() {
  return (
    <SiteLayout>
      <Grid item xs={10}>
        <Task/>
        </Grid>
    </SiteLayout>
  );
}

export default Calendar;