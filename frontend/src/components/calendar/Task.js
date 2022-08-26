import React, { useState, useEffect, memo } from "react";

import { Col, Row } from "react-bootstrap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";

import task, { setTask, addTask, deleteTask } from "../../redux/task";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import project from "../../redux/project";

import "../../styles/css/Calendar.css";

import TaskList from "./TaskList";
import Checkbox from "./AssignCheckbox";
import AddTask from "../modal/Calendar/AddTask";
import TaskCalendar from "./TaskCalendar";
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
    projectName:"",
    color:""
  });
  const [modalIsOpen, setIsOpen] = useState(false);
  const [clickedEventAssign, setClickedEventAssign] = useState("");
  const taskList = useSelector((state) => state.task, shallowEqual);
  const projectList = useSelector((state) => state.project, shallowEqual);

  const [filteredTask, setFilteredTask] = useState([]);
  /////

  const dispatch = useDispatch();

  /////

  const openModal = () => {
    setIsOpen(true);
  };

  function closeModal() {
    setIsOpen(false);
    setState((prevState) => ({ ...prevState, title: "",projectName:"" }));
  }

  useEffect(() => {

    if (!modalIsOpen && isInitial &&taskList.length !==0) {
      setFilteredTask(taskList);
      console.log(taskList);
      isInitial = false;
    }
  }, [taskList]);


  const onClickAddTask = (task) => {
    dispatch(addTask(task));
  };

  /////
  const eventClickHandler = (info) => {
    const { id, title, start, end } = info.event;
    const { userName, userNo, status, projectNo, color, projectName } =
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
      color: color,
      projectName:projectName
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
    <div className="animated fadeIn p-4 demo-app">
      <Row>
        <Col lg={9} sm={12} md={12}>
          <TaskCalendar
            taskList={filteredTask}
            eventClickHandler={eventClickHandler}
            dateClickHandler={dateClickHandler}
          />
        </Col>
        <Col lg={2}>
          <div className="external-events">
            <TaskList />
            {/* <button className="addTaskBtn" onClick={openModal}>
              일정 추가
            </button> */}
            <Checkbox
              filteredTask={filteredTask}
              setFilteredTask={setFilteredTask}
            />
          </div>
        </Col>
      </Row>
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
      />
    </div>
  );
}

export default Calendar;
