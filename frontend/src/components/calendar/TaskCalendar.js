import React,{memo} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import { useSelector, useDispatch, shallowEqual  } from 'react-redux';

import "../../styles/css/Calendar.css";

function TaskCalendar(props) {
  // const taskList = useSelector(state => state.task, shallowEqual);
  // const tasks = []

  // const groupBy =(objectArray, property)=> {
  //   return objectArray.reduce(function (acc, obj) {
  //     var key = obj[property];
  //     if (!acc[key]) {
  //       acc[key] = [];
  //       tasks.push({...obj, userName:acc[key]})
  //     }
  //     acc[key].push(obj.userName);
  //     return tasks;
  //   }, {});
  // }

  // const groupedPeople = groupBy(taskList, 'title');
  console.log("피곤카")
 console.log(props.taskList)
 console.log("피곤카")

  return (
    <div className="demo-app-calendar" id="mycalendartest"
    style={{width: "900px",marginLeft:'2%', fontFamily:'Cascadia Code'}}>
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
        events={props.taskList}
        eventClick={props.eventClickHandler}
        dateClick={props.dateClickHandler}
        eventColor={props.taskList.color}
      /></div>
  );
}

export default TaskCalendar