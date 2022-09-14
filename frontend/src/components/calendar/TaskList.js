import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import "../../styles/css/Calendar.css";

function TaskList() {
  const taskList = useSelector((state) => state.task, shallowEqual);

  return (
    <div>
      <div style={{textAlign:'center'}}><strong>개인 업무</strong></div>
      {taskList.map((event, index) => (
        <div
          key={index}
          className="fc-event"
          title={event.title}
          data={event.id}
          style={{
            backgroundColor: event.color,
            textAlign:'left'
          }}
        >
          {event.title}
        </div>
        ))
      }
    </div>
  );
}

export default TaskList;