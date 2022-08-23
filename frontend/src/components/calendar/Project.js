import * as React from 'react';
import { Col, Row } from "react-bootstrap";

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import ProjectTable from './ProjectTable'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import { MonthPicker } from '@mui/x-date-pickers/MonthPicker';
import { YearPicker } from '@mui/x-date-pickers/YearPicker';
import Grid from '@mui/material/Grid';
import { Paper } from '@mui/material';

const minDate = new Date('2020-01-01T00:00:00.000');
const maxDate = new Date('2022-01-01T00:00:00.000');

export default function Project() {
  const [date, setDate] = React.useState(new Date());

  return (
    <div className="animated fadeIn p-4 demo-app">
      <LocalizationProvider dateAdapter={AdapterDateFns}>

      <Box>
        <Paper>
        <Grid item xs={12} md={6}>
        
          
        </Grid>
        <ProjectTable/>
        </Paper>
      </Box>
      </LocalizationProvider>

    </div>
  );
}