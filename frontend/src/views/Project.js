import React, { memo  } from 'react';
import SiteLayout from '../components/layout/SiteLayout';
import Task from '../components/calendar/Task'
import Project from '../components/calendar/Project'
import {useDispatch ,shallowEqual , useSelector } from 'react-redux';


function ProjectCalendar() {


  return (
    <SiteLayout>
        <Project/>
    </SiteLayout>
  );
}

export default memo(ProjectCalendar);