import React, { useState, useEffect, memo, useMemo } from "react";
import { NavDropdown } from "react-bootstrap";
import { get, remove } from "../../apis/Axios";
import {Card, Box, Button, Grid, Paper, Divider} from "@mui/material";
import { NavLink } from "react-router-dom";
import CollapsibleTable from "./ProjectTable";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CalendarPicker } from "@mui/x-date-pickers/CalendarPicker";
import { MonthPicker } from "@mui/x-date-pickers/MonthPicker";
import { YearPicker } from "@mui/x-date-pickers/YearPicker";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import ProjectChart from "./ProjectChart";
import { setProject, deleteProject } from "../../redux/project";
import { setTask} from "../../redux/task";
import { setCREWFOCUS } from "../../redux/focus";
import AddProject from "../modal/Calendar/AddProject";


function Project({publishLinkPreview}) {

  const crewNo = useSelector((state) => state.focus.crewNo, shallowEqual);
  const [channelName, setChannelName] = useState('전체 채널')
  const [show, setShow] = React.useState(false);
  const [changeCrew, setChangeCrew] = useState();
  const [selectionModel, setSelectionModel] = React.useState([]);
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const crewList = useSelector((state) => state.crew, shallowEqual);
  const projectList = useSelector((state) => state.project, shallowEqual);
  const taskList = useSelector((state) => state.task, shallowEqual);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const channelNo = useSelector(state => (state.focus.channelNo), shallowEqual);
  console.log("크루 넘버!",crewNo)
  

  const initialTask = React.useCallback(
    async (projectNo) => {
      const getTasks = await get(`/task/pNo/${projectNo}`);
      dispatch(setTask(getTasks));
    },
    [dispatch]
  );

  useEffect(() => {
    setChangeCrew(crewNo);
  }, [crewNo]);

  const handleDelete = () => {
    selectionModel.map((id) => {
      remove(`/project/${id}`, id);
      const projectIdx = projectList.findIndex(event => event.id == id)
      dispatch(deleteProject(projectIdx));
    });
  };


  const columns = [
    { type: "string", label: "Task ID" },
    { type: "string", label: "Task Name" },
    { type: "string", label: "Resource" },
    { type: "date", label: "Start Date" },
    { type: "date", label: "End Date" },
    { type: "number", label: "기간" },
    { type: "number", label: "작업진행률" },
    { type: "string", label: "Dependencies" },
  ];
  const projects = projectList.map((i) => [
    i.id,
    i.projectName,
    i.status > 0 ? i.status > 50 ?'write': 'complate' : null, 
    new Date(i.start),
    new Date(i.end),
    null,
    i.status,
    null,
  ]);
  const data = [columns, ...projects];

useEffect(()=>{
  initialTask
},[initialTask])


  return (
    <div
      className="animated fadeIn p-4 demo-app"
      style={{ fontFamily: "SUIT-Medium" }}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box>
          <Paper>
            <Card sx={{ minWidth: 275 }}>
              <Grid item xs={10} md={12}>
                <div
                  style={{
                    float: "right",
                    border: "3px solid #f0f8ff69",
                    fontSize: "15px",
                    padding: "4px",
                  }}
                >
                  <NavDropdown
                    style={{
                      float: "right",
                      border: "3px solid #f0f8ff69",
                      fontSize: "15px",
                      padding: "4px",
                    }}
                    title="채널 선택"
                  >
                    <NavDropdown.Item
                    onClick={async() => {
                      setChannelName('전체 채널')
                      const getProjects = await get(`/project/${channelNo}`);
                      dispatch(setProject(getProjects));

                    }}>전체 채널</NavDropdown.Item>
                    <Divider />
                    {crewList.length !== 0
                      ? crewList.map((crew, index) => (
                        
                          <NavDropdown.Item
                            onClick={async() => {
                              setChangeCrew((prevState) => ({
                                ...prevState,
                                no: crew.no,
                                name: crew.name,
                              }));
                              dispatch(
                                setCREWFOCUS({ no: crew.no, name: crew.name })
                              );
                              setChannelName(crew.name)
                              const getProjects = await get(`/project/cNo/${crew.no}`);
                              dispatch(setProject(getProjects));
                            }}
                            key={index}
                          >
                            {crew.name}
                          </NavDropdown.Item>
                        ))
                      : ""}
                  </NavDropdown>
                  현재 채널은 <strong>{channelName}</strong> 입니다.
         
                  <Button
                    variant="primary"
                    onClick={handleShow}
                    style={{ fontFamily: "SUIT-Medium" }}
                  >
                    프로젝트 추가
                  </Button>
                  <AddProject 
                      show={show} 
                      handleClose={handleClose} 
                      setShow={setShow}
                      publishLinkPreview={publishLinkPreview}
                      />
                  <Button
                    variant="primary"
                    onClick={handleDelete}
                    style={{ fontFamily: "SUIT-Medium" }}
                  >
                    프로젝트 삭제
                  </Button>

                </div>
              </Grid>
              <ProjectChart
                changeCrew={changeCrew}
                projectList={projectList}
                data={data}
              />
              <CollapsibleTable
                date={date}
                projectList={projectList}
                selectionModel={selectionModel}
                setSelectionModel={setSelectionModel}
                changeCrew={changeCrew}
                data={data}   
              />
            </Card>
          </Paper>
        </Box>
      </LocalizationProvider>
    </div>
  );
}

export default memo(Project); 