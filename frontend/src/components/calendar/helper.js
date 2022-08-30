// import React, { useState, useEffect, memo,useCallback } from "react";
// import { useSelector, useDispatch, shallowEqual } from "react-redux";
// import moment from "moment";
// import { setProject } from "../../redux/project";

// import {
//   Gantt,
//   Task,
//   EventOption,
//   StylingOption,
//   ViewMode,
//   DisplayOption,
// } from "gantt-task-react";
// import "../../styles/css/gantt.css";
// import project from "../../redux/project";

// export function initTasks() {
//   const dispatch = useDispatch();

//   const crewNo = useSelector(state => (state.focus.crewNo), shallowEqual);
//   const projectList = useSelector((state) => state.project, shallowEqual);
//   const initialProject= useCallback(
//     async (crewNo) => {
//       const getProjects = await get(`/project/${crewNo}`);
//       dispatch(setProject(getProjects)); 
//       },
//     [dispatch]
//   );

//   useEffect(() => {
//     initialProject(crewNo);
//   }, [projectList]);

//   const li = projectList.map((task) => ({
//     start: new Date(task.start),
//     end: new Date(task.end),
//     name: task.projectName,
//     id: task.no,
//     progress: 30,
//     type: "project",
//     styles: { progressColor: "#ffbb54", progressSelectedColor: "#ff9e0d" },
//   }));

//   return li;
// }
// export function getStartEndDateForProject(tasks, projectId) {
//   const projectTasks = tasks.filter((t) => t.project === projectId);
//   let start = projectTasks[0].start;

//   let end = projectTasks[0].end;

//   for (let i = 0; i < projectTasks.length; i++) {
//     const task = projectTasks[i];
//     if (start.getTime() > task.start.getTime()) {
//       start = task.start;
//     }
//     if (end.getTime() < task.end.getTime()) {
//       end = task.end;
//     }
//   }
//   return [start, end];
// }
