import React,{useState} from 'react';
import { Col, Row } from "react-bootstrap";

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import CollapsibleTable from './ProjectTable'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import { MonthPicker } from '@mui/x-date-pickers/MonthPicker';
import { YearPicker } from '@mui/x-date-pickers/YearPicker';
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import project from "../../redux/project";
import Button from '@mui/material/Button';
import moment from "moment";
import ProjectChart from './ProjectChart'

import Grid from '@mui/material/Grid';
import { Paper } from '@mui/material';

const minDate = new Date('2018');
const maxDate = new Date('2023');

export default function Project() {
  

  const [date, setDate] = useState(new Date());
  const now = new Date();

  return (
    <div className="animated fadeIn p-4 demo-app">
      <LocalizationProvider dateAdapter={AdapterDateFns}>

      <Box>
        <Paper>

        <Grid item xs={10} md={12}>

        <YearPicker
            date={date}
            minDate={minDate}
            maxDate={maxDate}
            onChange={(newDate) => setDate(newDate)}
          />
          
        </Grid>
        <ProjectChart date={date}/>
        <CollapsibleTable date={date}/>
        </Paper>
      </Box>
      </LocalizationProvider>

    </div>
  );
}