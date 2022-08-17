import React, { useState, useEffect, useCallback } from "react";

import { Col, Row } from "react-bootstrap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";

import { setTask, addTask, deleteTask } from '../../redux/task';
import { useSelector, useDispatch, shallowEqual  } from 'react-redux';
import {get} from '../../apis/Axios'
import "../../styles/css/Calendar.css";

import TaskList from "./TaskList";
import Checkbox from "./AssignCheckbox";
import AddTask from "../modal/Calendar/AddTask";
import TaskContainer from "../container/TaskContainer";
import TaskCalendar from "./TaskCalendar";
function Calendar() {

    const [state, setState] = useState({id: '', projectNo: '', userNo: '', title: '', start: '', end: '', status:'', crewNo: ''})
    const [modalIsOpen, setIsOpen] = useState(false);
    const [clickedEventAssign, setClickedEventAssign] = useState("");

    /////

    const dispatch = useDispatch();
    const taskList = useSelector(state => state.task, shallowEqual);
    
    /////

    const openModal = () => {setIsOpen(true)}
    
    function closeModal() {
      setIsOpen(false)
      setState(prevState => ({...prevState, title:"" }))   
    }

    function getRandomColor() {
      return `hsl(${parseInt(Math.random() * 24, 10) * 15}, 16%, 57%)`;
    }

    const initialTask = useCallback(async(projectNo) => {
        const getTasks = await get(`/task/${projectNo}`);
        dispatch(setTask(getTasks));
    }, [dispatch])

    useEffect(() => {
        initialTask(1);
        console.log("fjsdkfsd2348320"+initialTask(1))
    }, [])


    const onClickAddTask = (task) => {
      dispatch(addTask(task));
    }

    
    /////
    const eventClickHandler = (info) => {
      const {id, title ,start, end, classNames} = info.event;
      setState({title: title, start: start, end: end, id: id, classNames: classNames})
      setClickedEventAssign(info.event.classNames);
      openModal();
    };
  
    const dateClickHandler = (info) => {
      setState({start: info.date, end: info.date})
      openModal();
    };


  return (
    <div className="animated fadeIn p-4 demo-app">
      <Row>
        <Col lg={2}>
          <div className="external-events">
            
              <TaskList taskList={taskList}/>
              <button className="addTaskBtn"onClick={openModal}>
                일정 추가
              </button>
              <Checkbox/>
           
             </div>
        </Col>
        <Col lg={9} sm={12} md={12}>
          <TaskCalendar taskList={taskList} eventClickHandler={eventClickHandler} dateClickHandler={dateClickHandler}/>
        </Col>
      </Row>
      <AddTask modalIsOpen={modalIsOpen} closeModal={closeModal} taskList={taskList} state={state} setState={setState} onClickAddTask={onClickAddTask}/>
     <TaskContainer/>
    </div>
  );
}

export default Calendar;