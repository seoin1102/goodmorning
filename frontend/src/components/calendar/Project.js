import { Box, Button, Card, Divider, Grid, Paper } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { memo, useEffect, useState } from "react";
import { NavDropdown } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { get, remove } from "../../apis/Axios";
import { setCREWFOCUS } from "../../redux/focus";
import { deleteProject, setProject } from "../../redux/project";
import { setTask } from "../../redux/task";
import AddProject from "../modal/Calendar/AddProject";
import ProjectChart from "./ProjectChart";
import CollapsibleTable from "./ProjectTable";


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
  const channelNo = useSelector(state => (state.focus.channelNo), shallowEqual);
  console.log("크루 넘버!",crewNo)
  const initialProject = React.useCallback(
    async (crewNo) => {
      const getProjects = await get(`/project/cNo/${crewNo}`);
      dispatch(setProject(getProjects));
    },
    [dispatch]
  );

  const totalProject = React.useCallback(
    async (channelNo) => {
      const getProjects = await get(`/project/${channelNo}`);
      dispatch(setProject(getProjects));
    },
    [dispatch]
  );
  const initialTask = React.useCallback(
    async (projectNo) => {
      const getTasks = await get(`/task/pNo/${projectNo}`);
      dispatch(setTask(getTasks));
    },
    [dispatch]
  );

  useEffect(() => {
    setChangeCrew(crewNo);
    console.log("무한랜더링찾기2")
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
    "#34d6ce",
    new Date(i.start),
    new Date(i.end),
    null,
    i.status,
    null,
  ]);
  const data = [columns, ...projects];
// useEffect(()=>{
//   initialProject
// },[initialProject])

// useEffect(()=>{
//   totalProject
// },[totalProject])

useEffect(()=>{
  initialTask
  console.log("무한랜더링 찾기")
},[initialTask])

  console.log("프로젝트 테스트")
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
                    onClick={() => {
                      setChannelName('전체 채널')
                      return totalProject(channelNo);

                    }}>전체 채널</NavDropdown.Item>
                    <Divider />
                    {crewList.length !== 0
                      ? crewList.map((crew, index) => (
                        
                          <NavDropdown.Item
                            onClick={() => {
                              setChangeCrew((prevState) => ({
                                ...prevState,
                                no: crew.no,
                                name: crew.name,
                              }));
                              dispatch(
                                setCREWFOCUS({ no: crew.no, name: crew.name })
                              );
                              setChannelName(crew.name)
                              return initialProject(crew.no);
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

                  {/* <NavLink style={{ textDecorationLine: "none" }} to={"/task"}>
                    <Button
                      style={{ fontFamily: "SUIT-Medium", color: "black" }}
                      onClick={handleTask}
                    >
                      작업 설정
                    </Button>
                  </NavLink> */}
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