import React, {  useEffect, useCallback, useSelector  } from 'react';
import SiteLayout from '../components/layout/SiteLayout';
import Task from '../components/calendar/Task'
import Project from '../components/calendar/Project'
import {useDispatch ,shallowEqual  } from 'react-redux';
import {get} from '../apis/Axios';
import  { setTask } from '../redux/task';
import { setCrewUser } from "../redux/crewUser";
import { setProject } from "../redux/project";

function Calendar() {

  const dispatch = useDispatch();

  // const initialTask = useCallback(
  //   async (projectNo) => {
  //     const getTasks = await get(`/pNo/${projectNo}`);
  //     dispatch(setTask(getTasks));
  //   },
  //   [dispatch]
  // );

  const initialTask = useCallback(
    async (crewNo) => {
      const getTasks = await get(`/task/cNo/${crewNo}`);
      dispatch(setTask(getTasks));
    },
    [dispatch]
  );


  const initialCrew = useCallback(
    async (no) => {
      const assignList = await get(`/crew/user/${no}`);
      dispatch(setCrewUser(assignList));},
    [dispatch]
  );

  const initialProject= useCallback(
    async (crewNo) => {
      const getProjects = await get(`/project/${crewNo}`);
      dispatch(setProject(getProjects)); },
    [dispatch]
  );

  useEffect(() => {
    initialTask(40);
  }, []);

  useEffect(() => {
    initialCrew(40);
  }, []);

  useEffect(() => {
    initialProject(40);
  }, []);

  return (
    <SiteLayout>
        {/* <Project/> */}
        <Task/>
    </SiteLayout>
  );
}

export default Calendar;