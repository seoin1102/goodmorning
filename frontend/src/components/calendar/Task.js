import React, { useState, useEffect, useCallback } from "react";

import { Col, Row } from "react-bootstrap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";

import { setTask, addTask, deleteTask } from '../../redux/task';
import { useSelector, useDispatch, shallowEqual  } from 'react-redux';

//import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";
// import "../assets/css/bootstrap.min.css";
import "../../styles/css/Calendar.css";

import AddTask from "../modal/Calendar/AddTask";
function Calendar() {
    const dispatch = useDispatch();
    const taskList = useSelector(state => state.task, shallowEqual);
    
    // 선택
    // const data, const state, const usememo


    const onClickAddTask = (task) => {
      dispatch(addTask(task));
    }

    function getRandomColor() {
      return `hsl(${parseInt(Math.random() * 24, 10) * 15}, 16%, 57%)`;
    }
  /////////////////////////////////////////////////////////////

  const [state, setState] = useState({
    id: '',
    projectNo: '',
    userNo: '',
    title: '',
    start: '',
    end: '',
    status:'',
    crewNo: ''

  })

  const [modalIsOpen, setIsOpen] = useState(false);
  const [clickedEventAssign, setClickedEventAssign] = useState("");

 
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false)
    setState(prevState => {return {...prevState, title:"" }}) 
    
}
  
  const assigns = [
    { value: "김서인", label: "김서인", no: 1 },
    { value: "김휘민", label: "김휘민", no: 2 },
    { value: "최시창", label: "최시창", no: 3 },
    { value: "김현석", label: "김현석", no: 4 },
  ];

  ////////////////////////////////////////////////////////
  useEffect(() => {
    let draggableEl = document.getElementById("external-events");
    new Draggable(draggableEl, {
      itemSelector: ".fc-event",
      eventData: function (eventEl) {
        let title = eventEl.getAttribute("title");
        let start = eventEl.getAttribute("start");
        let end = eventEl.getAttribute("end");

        let id = eventEl.getAttribute("data");
        let backgroundColor = eventEl.getAttribute("backgroundColor");
        return {
          title: title,
          start: start,
          end: end,
          id: id,
          backgroundColor: backgroundColor,
        };
      },
    });
  });

  /**
   * when we click on event we are displaying event details
   */

  const eventClickHandler = (info) => {
    const {id, title ,start, end, classNames} = info.event;
    setState({
      title: title,
      start: start,
      end: end,
      id: id,
      classNames: classNames
    })
  
    setClickedEventAssign(info.event.classNames);
    openModal();
  };


  const dateClickHandler = (info) => {
    setState({
      start: info.date,
      end: info.date,
    })
    openModal();
  };

  function openModal() {
    setIsOpen(true);
}
  const [checkedList, setCheckedLists] = useState([]);

  // 전체 체크 클릭 시 발생하는 함수
  const onCheckedAll = useCallback(
    (checked) => {
      if (checked) {
        const checkedListArray = [];

        assigns.forEach((list) => checkedListArray.push(list));

        setCheckedLists(checkedListArray);
      } else {
        setCheckedLists([]);
      }
    },
    [assigns]
  );

  // 개별 체크 클릭 시 발생하는 함수
  const onCheckedElement = useCallback((checked, list) => {
    if (checked)
      setCheckedLists((prevCheckedList) => prevCheckedList.concat(list));

    setCheckedLists((prevCheckedList) =>
      prevCheckedList.filter((el) => el !== list)
    );
  }, []);

  return (
    <div className="animated fadeIn p-4 demo-app">
      <Row>
        
        {/* <CalendarItem /> */}
        <Col lg={2}>
          {console.log("!!!!!!",  taskList)}
          <div
            id="external-events"
            style={{ maxHeight: "-webkit-fill-available", border: "1px solid #c8cacb"}}

          >
            <div align="center">
              <strong> Events</strong>
              {taskList.map((event, index) => (
                <div
                  key={index}
                  className="fc-event"
                  title={event.title}
                  data={event.id}
                  style={{
                    backgroundColor: event.backgroundColor
                  }}
                >
                  {event.title}
                  
                </div>

                
              ))}
              <button
                onClick={openModal}
                style={{
                  padding: "10px",
                  width: "90%",
                  height: "auto",
                  maxHeight: "-webkit-fill-available",
                  border: "0px solid #c8cacb",
                }}
              >
                일정 추가
              </button>
            </div>
            <div className="assign-checklist">
            <input
              type="checkbox"
              onChange={(e) => onCheckedAll(e.target.checked)}
              checked={
                checkedList.length === 0
                  ? false
                  : checkedList.length === assigns.length
                  ? true
                  : false
              }
            /><strong>전체</strong>
            <br />
            {assigns.map((list, index) => (
              <div key={index}>
                <input
                  key={list.label}
                  type="checkbox"
                  onChange={(e) =>
                    onCheckedElement(e.target.checked, list.label)
                  }
                  checked={checkedList.includes(list.label) ? true : false}
                />
                {list.label}
                <br />
              </div>
            ))}
          </div>            </div>

        </Col>

        <Col lg={9} sm={12} md={12}>
          <div
            className="demo-app-calendar"
            id="mycalendartest"
            style={{ color: "black"}}
          >
            <FullCalendar
              defaultView="dayGridMonth"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
              }}
              locale="ko"

              eventDurationEditable={true}
              editable={true}
              droppable={true}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              //ref={calendarComponentRef}
              //weekends={calendarWeekends}
              events={taskList}
              //eventDrop={drop}
              // drop={this.drop}
              //eventReceive={eventReceive}
              eventClick={eventClickHandler}
              //selectable={true}
              dateClick={dateClickHandler}
              //eventColor={getRandomColor}
            />
          </div>

          
        </Col>
      </Row>
      <AddTask modalIsOpen={modalIsOpen} closeModal={closeModal} taskList={taskList} state={state} setState={setState} onClickAddTask={onClickAddTask}/>
     
    </div>
  );
}

export default Calendar;