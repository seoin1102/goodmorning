import React from "react";
import "../../styles/css/Calendar.css";
import task,{ setTask, addTask, deleteTask } from "../../redux/task";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

function TaskList(props) {
  const taskList = useSelector((state) => state.task, shallowEqual);

  return (
    <div>
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
        ))
      }
    </div>
  );
}

export default TaskList;