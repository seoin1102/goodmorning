import React, { useEffect, useCallback } from 'react';
import { get, post } from '../../apis/Axios';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { setTask, addTask, deleteTask } from '../../redux/task';
/**
 * 
 * @returns 채널리스트(모달)
 */
function TaskContainer() {
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.task, shallowEqual);

    const initialTask = useCallback(async(projectNo) => {
        const getTasks = await get(`/task/${projectNo}`);
        dispatch(setTask(getTasks));
    }, [dispatch])
    
    useEffect(() => {
        initialTask(1);
    }, [])

    return (
        <div>
        </div>
    );
}

export default TaskContainer;