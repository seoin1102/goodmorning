import React, { useEffect, useState, useCallback } from "react";
import { ViewMode, Gantt } from "gantt-task-react";
import "../../styles/css/gantt.css";

let isInitial = true;

export function  ProjectChart  (props) {

  const [view, setView] = useState(ViewMode.Day);
  const [tasks, setTasks] = useState(props.initialTasks);
  const [isChecked, setIsChecked] = useState(true);

  useEffect(() =>{
    
    setTasks(props.initialTasks)
}, [props.initialTasks])

  if (isInitial&&tasks.length !== 0) {
    setTasks(props.initialTasks);
    isInitial = false;
  }

  let columnWidth = 60;
  if (view === ViewMode.Month) {
    columnWidth = 300;
  } else if (view === ViewMode.Week) {
    columnWidth = 250;
  }


  return (
    <>
      {tasks.length !== 0 && (
        <div>
          <h3>프로젝트 달력</h3>
          <Gantt
            tasks={tasks}
            viewMode={'Month'}
            listCellWidth={isChecked ? "130px" : ""}
            columnWidth={columnWidth}
            barBackgroundColor="red"
            rowHeight={50}
            fontSize={12}
          />

        </div>
      )}
    </>
  );
};

export default ProjectChart;