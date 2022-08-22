import React, {  useEffect, useCallback  } from 'react';
import SiteLayout from '../components/layout/SiteLayout';
import Task from '../components/calendar/Task'
import {useDispatch  } from 'react-redux';
import {get} from '../apis/Axios';
import  { setTask } from '../redux/task';
import { setCrewUser } from "../redux/crewUser";

function Calendar() {
  console.log("Calendar")
  const dispatch = useDispatch();

  const initialTask = useCallback(
    async (projectNo) => {
      const getTasks = await get(`/task/${projectNo}`);
      console.log("**************************")
      console.log(getTasks)
      dispatch(setTask(getTasks));
      console.log("태스크 랜더링")

    },
    [dispatch]
  );

  const initialCrew = useCallback(
    async (no) => {
      const assignList = await get(`/crew/user/${no}`);
      dispatch(setCrewUser(assignList));
      console.log("크루 랜더링")
    },
    [dispatch]
  );

  useEffect(() => {
    initialTask(1);
    initialCrew(20);
  }, []);

  return (
    <SiteLayout>
        <Task/>
  
    </SiteLayout>
  );
}

export default Calendar;