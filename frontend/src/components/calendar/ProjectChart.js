import React, { useEffect, useState, useCallback } from "react";
import { ViewMode, Gantt } from "gantt-task-react";
import "../../styles/css/gantt.css";
import {Row, Col} from "react-bootstrap";

let isInitial = true;

export function  ProjectChart  (props) {

  const [view, setView] = useState(ViewMode.Month);
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
    columnWidth = 150;
  } else if (view === ViewMode.Week) {
    columnWidth = 250;
  }
  const TaskListHeader = () => {
    return (
      <Row style={{ width: 400, marginTop: 18,marginBottom:8}}>
        <Col breakPoint={{ xs: 3 }} style={{textAlign:"center", fontWeight:"bolder"}}>프로젝트 명</Col>
        <Col breakPoint={{ xs: 3 }} style={{textAlign:"center"}}>시작 일시</Col>
        <Col breakPoint={{ xs: 3 }} style={{textAlign:"center"}}>종료 일시</Col>
        <Col breakPoint={{ xs: 3 }} style={{textAlign:"center"}}>종료 일시</Col>

      </Row>
    );
  };

  return (
    <>
      {tasks.length !== 0 && (
        <div>
          <h3>프로젝트 달력</h3>
          <Gantt
            tasks={tasks}
            viewMode={'Month'}
            listCellWidth={""}
            columnWidth={columnWidth}
            barBackgroundColor="red"
            rowHeight={50}
            fontSize={12}
            locale={'kor'}
            viewDate={new Date(2022, 8, 1)}
            ganttHeight={500}
            // TaskListHeader={TaskListHeader} 
            preStepsCount={7}
          />

        </div>
      )}
    </>
  );
};

export default ProjectChart;