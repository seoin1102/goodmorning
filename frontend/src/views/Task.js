import React, {  useEffect, useCallback  } from 'react';
import SiteLayout from '../components/layout/SiteLayout';
import Task from '../components/calendar/Task'
import Project from '../components/calendar/Project'
import {useDispatch ,shallowEqual , useSelector } from 'react-redux';
import {get} from '../apis/Axios';
import  { setTask } from '../redux/task';
import { setCrewUser } from "../redux/crewUser";
import { setProject } from "../redux/project";

function TaskCalendar() {

  const dispatch = useDispatch();

  // const initialTask = useCallback(
  //   async (projectNo) => {
  //     const getTasks = await get(`/pNo/${projectNo}`);
  //     dispatch(setTask(getTasks));
  //   },
  //   [dispatch]
  // );
  const crewNo = useSelector(state => (state.focus.crewNo), shallowEqual);


  const initialTask = useCallback(
    async (crewNo) => {
      const getTasks = await get(`/task/cNo/${crewNo}`);
      dispatch(setTask(getTasks));
    },
    [dispatch]
  );


  const initialCrew = useCallback(
    async (crewNo) => {
      const assignList = await get(`/crew/user/${crewNo}`);
      dispatch(setCrewUser(assignList));},
    [dispatch]
  );

  const initialProject= useCallback(
    async (crewNo) => {
      const getProjects = await get(`/project/${crewNo}`);
      dispatch(setProject(getProjects)); 
      console.log(crewNo)},
    [dispatch]
  );

  useEffect(() => {
    initialTask(crewNo);
  }, []);

  useEffect(() => {
    initialCrew(crewNo);
  }, []);

  useEffect(() => {
    initialProject(crewNo);
  }, []);

  return (
    <SiteLayout>
        <Task/>
    </SiteLayout>
  );
}

export default TaskCalendar;