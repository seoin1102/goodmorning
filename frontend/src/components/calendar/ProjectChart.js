import React, { useEffect, useState } from "react";
import { ViewMode, Gantt } from "gantt-task-react";
import { ViewSwitcher } from "./view-switcher";
import { getStartEndDateForProject, initTasks } from "./helper";
import "../../styles/css/gantt.css";
import AddProject from "../../components/modal/Calendar/AddProject"
import Button from 'react-bootstrap/Button';

//Init

let isInitial = true;

const ProjectChart = () => {
  const [view, setView] = useState(ViewMode.Day);
  const [tasks, setTasks] = useState([]);
  const [isChecked, setIsChecked] = useState(true);
  const [show, setShow] = useState(false);
  const [selected, setSeleted] = useState(false);
  const [state, setState] = useState();

  useEffect(() => {
    if (selected) {
      setSeleted(false);
    }
  }, [selected]);

  const handleClick = () => setSeleted(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const initialTasks = initTasks();
  if (isInitial && initialTasks.length !== 0) {
    setTasks(initialTasks);
    isInitial = false;
  }

  let columnWidth = 60;
  if (view === ViewMode.Month) {
    columnWidth = 300;
  } else if (view === ViewMode.Week) {
    columnWidth = 250;
  }
  const handleTaskChange = (task) => {
    console.log("On date change Id:" + task.id);
    let newTasks = tasks.map((t) => (t.id === task.id ? task : t));
    if (task.project) {
      const [start, end] = getStartEndDateForProject(newTasks, task.project);
      const project =
        newTasks[newTasks.findIndex((t) => t.id === task.project)];
      if (
        project.start.getTime() !== start.getTime() ||
        project.end.getTime() !== end.getTime()
      ) {
        const changedProject = { ...project, start, end };
        newTasks = newTasks.map((t) =>
          t.id === task.project ? changedProject : t
        );
      }
    }
    setTasks(newTasks);
  };
  const handleTaskDelete = (task) => {
    const conf = window.confirm("Are you sure about " + task.name + " ?");
    if (conf) {
      setTasks(tasks.filter((t) => t.id !== task.id));
    }
    return conf;
  };
  const handleProgressChange = async (task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    console.log("On progress change Id:" + task.id);
    
  };
  const handleDblClick = (task) => {
    console.log("*****************")
    console.log(task)
    console.log("*****************")

    if(task){
      setTasks(task)
    }  };
  const handleSelect = (task, isSelected) => {
    console.log("*****************")
    console.log(task)
    console.log("*****************")

    if(task){
      // setTasks(task)
    }
    console.log(task + " has " + (isSelected ? "selected" : "unselected"));
    // alert("변경 버튼??" + task.id);
  };
  const handleExpanderClick = (task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    alert("이건 뭐지?" + task.id);
  };
  
  return (
    <>
      {tasks.length !== 0 && (
        <div>
  
          <h3>프로젝트 달력</h3>
          <Gantt
            tasks={tasks}
            viewMode={'Month'}
            onDateChange={handleTaskChange}
            onDelete={handleTaskDelete}
            onProgressChange={handleProgressChange}
            onDoubleClick={handleShow}
            onSelect={handleSelect}
            onExpanderClick={handleExpanderClick}
            listCellWidth={isChecked ? "130px" : ""}
            columnWidth={columnWidth}
            barBackgroundColor="red"
            rowHeight={50}
            fontSize={12}
          />
          <Button  
          variant="primary"
          disabled={selected}
          onClick={!selected ? handleClick : null}>
            프로젝트 수정
          </Button>
          <Button variant="primary" onClick={handleShow}>
            프로젝트 추가
          </Button>
          <AddProject show={show} handleClose={handleClose} tasks={tasks} setTasks={setTasks}/>
        </div>
      )}
    </>
  );
};
export default ProjectChart;
