import React from 'react';
import SiteLayout from '../components/layout/SiteLayout';
import Task from '../components/calendar/Task'

function Calendar() {
  return (
    <SiteLayout>
        <Task/>
    </SiteLayout>
  );
}

export default Calendar;