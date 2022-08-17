import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";

import "../../styles/css/Calendar.css";

function TaskCalendar(props) {

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
      /></div>
  );
}

export default TaskCalendar;