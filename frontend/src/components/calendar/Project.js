import React,{useState,useEffect } from 'react';
import { Col, Row } from "react-bootstrap";
import { NavDropdown } from 'react-bootstrap';
import {get} from '../../apis/Axios';

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
import { setProject } from "../../redux/project";
import { setCREWFOCUS } from '../../redux/focus';

import Grid from '@mui/material/Grid';
import { Paper } from '@mui/material';

const minDate = new Date('2018');
const maxDate = new Date('2023');

export default function Project() {
  const crewNo = useSelector(state => state.focus.crewNo, shallowEqual);
  const crewName = useSelector(state => (state.focus.crewName), shallowEqual);

  const [date, setDate] = useState(new Date());
  const now = new Date();
  const dispatch = useDispatch();
  const crewList = useSelector(state => (state.crew), shallowEqual);
  const projectList = useSelector((state) => state.project, shallowEqual);
  const [changeCrew, setChangeCrew] = useState();

  const initialProject= React.useCallback(
    async (crewNo) => {
      const getProjects = await get(`/project/${crewNo}`);
      dispatch(setProject(getProjects)); 
      },
    [dispatch]
  );

  useEffect(() =>{
    setChangeCrew(crewNo)

}, [crewNo])


const initialTasks = projectList.map((task,index) => ({
  key:index,
  start: new Date(task.start),
  end: new Date(task.end),
  name: task.projectName,
  id: task.id,
  progress: 30,
  type: "project",
  styles: { progressColor: "#ffbb54", progressSelectedColor: "#ff9e0d" },
}));
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
           <NavDropdown
        title="크루 선택"
      >
      {
        crewList.length !== 0 ?
        (
          crewList.map((crew, index) => 
          <NavDropdown.Item
          onClick={() => { 
            setChangeCrew((prevState) => ({...prevState, no: crew.no, name: crew.name}))
            dispatch(setCREWFOCUS({no: crew.no, name: crew.name}));

            return initialProject(crew.no)}}
            key={index} >
              {crew.name}
          </NavDropdown.Item>)
        ) : ''
      }
      </NavDropdown>  
        </Grid>
        <ProjectChart changeCrew={changeCrew} projectList={projectList} initialTasks={initialTasks}/>
        <CollapsibleTable date={date} projectList={projectList}/>

        </Paper>
      </Box>
      </LocalizationProvider>

    </div>
  );
}