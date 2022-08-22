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


  return (
    <div className="demo-app-calendar" id="mycalendartest">
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
        eventColor="rgba(47, 41, 41, 0.432)"
      /></div>
  );
}

export default TaskCalendar