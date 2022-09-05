import React from "react";
import "../../styles/css/Calendar.css";
import { useSelector, shallowEqual } from "react-redux";

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