import React, { useState, useEffect, useCallback  } from 'react';
import SiteLayout from '../components/layout/SiteLayout';
import Task from '../components/calendar/Task'
import AddTask from '../components/modal/Calendar/AddTask';
import { useSelector, useDispatch, shallowEqual  } from 'react-redux';
import {get, put, post, remove} from '../apis/Axios';
import task, { setTask, addTask, deleteTask, updateTask } from '../redux/task';
import { setCrewUser } from "../redux/crewUser";

function Calendar() {
  const dispatch = useDispatch();

  const initialTask = useCallback(
    async (projectNo) => {
      const getTasks = await get(`/task/${projectNo}`);
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