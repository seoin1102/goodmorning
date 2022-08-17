import React from "react";
import "../../styles/css/Calendar.css";

function TaskList(props) {
  return (
    <div>
      <strong> Events</strong>
      {props.taskList.map((event, index) => (
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
        </div>))}
    </div>
  );
}

export default TaskList;