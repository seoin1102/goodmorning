import React, { useEffect, useState, useCallback } from "react";
import { ViewMode, Gantt } from "gantt-task-react";
import { ViewSwitcher } from "./view-switcher";
import "../../styles/css/gantt.css";
import AddProject from "../../components/modal/Calendar/AddProject"
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import { setProject } from "../../redux/project";
import {get} from '../../apis/Axios';

import { useSelector, useDispatch, shallowEqual  } from 'react-redux';

//Init

let isInitial = true;
const initTasks = () =>{
  const dispatch = useDispatch();
  const projectList = useSelector((state) => state.project, shallowEqual);
  const crewNo = useSelector(state => (state.focus.crewNo, shallowEqual));
  const initialProject= useCallback(
    async (crewNo) => {
      const getProjects = await get(`/project/${crewNo}`);
      dispatch(setProject(getProjects)); 
    },
    [dispatch]
  );
  useEffect(() => {
    initialProject(crewNo);
  }, []);

  const li = projectList.map((task,index) => ({
    key:index,
    start: new Date(task.start),
    end: new Date(task.end),
    name: task.projectName,
    id: task.id,
    progress: 30,
    type: "project",
    styles: { progressColor: "#ffbb54", progressSelectedColor: "#ff9e0d" },
  }));

  return li;
}
////////////////////////////////////////////////////////////////////////////
export function  ProjectChart  () {
  const dispatch = useDispatch();
  const projectList = useSelector((state) => state.project, shallowEqual);
  const crewNo = useSelector(state => (state.focus.crewNo, shallowEqual));

  const initialProject= useCallback(
    async (crewNo) => {
      const getProjects = await get(`/project/${crewNo}`);
      dispatch(setProject(getProjects)); 
      },
    [dispatch]
  );
  useEffect(() => {
    initialProject(crewNo);
    
  }, []);

  const [view, setView] = useState(ViewMode.Day);
  const [tasks, setTasks] = useState([]);
  const [isChecked, setIsChecked] = useState(true);


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