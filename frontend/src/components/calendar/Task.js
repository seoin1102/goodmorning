import React, { memo, useCallback, useEffect, useState } from "react";

import { Col, Row } from "react-bootstrap";
import { setTask, addTask } from "../../redux/task";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {  Box, Card, Button, Paper } from "@mui/material";
import { NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { get } from '../../apis/Axios';

import "../../styles/css/Calendar.css";

import AddTask from "../modal/Calendar/AddTask";
import Checkbox from "./AssignCheckbox";
import TaskCalendar from "./TaskCalendar";
import TaskList from "./TaskList";
let isInitial = true;

function Calendar() {
  const [state, setState] = useState({
    id: "",
    projectNo: "",
    userName: "",
    title: "",
    start: "",
    end: "",
    status: "",
    crewNo: "",
    projectName: "",
    color: "",
  });
  const [modalIsOpen, setIsOpen] = useState(false);
  const [clickedEventAssign, setClickedEventAssign] = useState("");
  const taskList = useSelector((state) => state.task, shallowEqual);
  const crewNo = useSelector((state) => state.focus.crewNo, shallowEqual);
  const crewList = useSelector((state) => state.crew, shallowEqual);

  const [filteredTask, setFilteredTask] = useState([]);
  /////

  const dispatch = useDispatch();

  /////

  const openModal = () => {
    setIsOpen(true);
  };

  function closeModal() {
    setIsOpen(false);
    setState((prevState) => ({ ...prevState, title: "", projectName: "" }));
  }

  useEffect(() => {
    if (!modalIsOpen && isInitial && taskList.length !== 0) {
      setFilteredTask(taskList);

      isInitial = false;
    }
  }, [taskList]);

  const onClickAddTask = (task) => {
    dispatch(addTask(task));
  };

  const initialTask = useCallback(async(crewNo)=>{
    const getTasks = await get(`/task/cNo/${crewNo}`);
    dispatch(setTask(getTasks));
}, [dispatch])
  /////
  const eventClickHandler = (info) => {
    const { id, title, start, end, borderColor } = info.event;
    const { userName, userNo, status, projectNo,  projectName } =
      info.event.extendedProps;

    const clickedTask = {
      title: title,
      start: start,
      end: end,
      id: id,
      userName: userName,
      userNo: userNo,
      status: status,
      projectNo: projectNo,
      color: borderColor,
      projectName: projectName,
    };

    if (end == null) {
      const clickedOnedayTask = { ...clickedTask, end: start };
      setState(clickedOnedayTask);
    } else {
      setState(clickedTask);
    }

    openModal();
  };

  const dateClickHandler = (info) => {
    setState({ start: info.date, end: info.date, title: "" });
    openModal();
  };

  return (
    <div
      className="animated fadeIn p-4 demo-app"
    >
      <Box>
        <Paper>
          <Card sx={{ minWidth: 275 }}>
            <div style={{display:'flex', justifyContent:"space-between", alignItems:"center"}}>
              <h3 style={{ padding: "30px 0px 0px 50px", width: "200px" }}>
                업무 달력
              </h3>
            </div>
            <div style={{display:'flex',gap:"1rem"}}>
            
            <Row style={{ padding: "20px" }}>
              <div>
                <Col lg={9} sm={12} md={12}>
                  <TaskCalendar
                    taskList={filteredTask}
                    eventClickHandler={eventClickHandler}
                    dateClickHandler={dateClickHandler}
                  />
                </Col>
              </div>
            </Row>
            <div className="external-events">
              <TaskList />
              <Checkbox
                filteredTask={filteredTask}
                setFilteredTask={setFilteredTask}
              />
            </div></div>
            <AddTask
              modalIsOpen={modalIsOpen}
              closeModal={closeModal}
              taskList={filteredTask}
              state={state}
              setState={setState}
              onClickAddTask={onClickAddTask}
              clickedEventAssign={clickedEventAssign}
              setClickedEventAssign={setClickedEventAssign}
              filteredTask={filteredTask}
              setFilteredTask={setFilteredTask}
              crewNo={crewNo}
            />
          </Card>
        </Paper>
      </Box>
    </div>
  );
}

export default memo(Calendar);
