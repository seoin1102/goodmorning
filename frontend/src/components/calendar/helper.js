import React, { useState, useEffect, memo } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import moment from "moment";

import {
  Gantt,
  Task,
  EventOption,
  StylingOption,
  ViewMode,
  DisplayOption,
} from "gantt-task-react";
import "../../styles/css/gantt.css";
import project from "../../redux/project";

export function initTasks() {
  const projectList = useSelector((state) => state.project, shallowEqual);
  const taskList = useSelector((state) => state.task, shallowEqual);

  console.log(projectList)

  const li = projectList.map((task) => ({
    start: new Date(task.start),
    end: new Date(task.end),
    name: task.projectName,
    id: task.no,
    progress: 30,
    type: "project",
    styles: { progressColor: "#ffbb54", progressSelectedColor: "#ff9e0d" },
  }));

 
  return li;
}
export function getStartEndDateForProject(tasks, projectId) {
  const projectTasks = tasks.filter((t) => t.project === projectId);
  let start = projectTasks[0].start;

  let end = projectTasks[0].end;

  for (let i = 0; i < projectTasks.length; i++) {
    const task = projectTasks[i];
    if (start.getTime() > task.start.getTime()) {
      start = task.start;
    }
    if (end.getTime() < task.end.getTime()) {
      end = task.end;
    }
  }
  return [start, end];
}
