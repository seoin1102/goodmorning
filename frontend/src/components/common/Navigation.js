import Grid from '@mui/material/Grid';
import React, { useCallback, useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { get, post, putJson } from '../../apis/Axios';
import { getLocalStorageAuthUser } from '../../apis/Fetch';
import { addChannel } from '../../redux/channel';
import { addCrew, setCrew } from '../../redux/crew';
import { setCrewUser } from "../../redux/crewUser";
import { setCREWFOCUS } from '../../redux/focus';
import { setProject } from '../../redux/project';
import { setTask } from '../../redux/task';
import NavigationCrew from './navigation/NavigationCrew';
import NavigationEct from './navigation/NavigationEct';

function Navigation({setFlag}) {

    const dispatch = useDispatch();
    const crewList = useSelector(state => (state.crew), shallowEqual);

    const user = getLocalStorageAuthUser();
    const userNo = user.no;
    const channelNo = useSelector(state => (state.focus.channelNo), shallowEqual);

    const crewNo = useSelector(state => (state.focus.crewNo), shallowEqual);
    const crewName = useSelector(state => (state.focus.crewName), shallowEqual);
    const [changeCrew, setChangeCrew] = useState({
        no: crewNo,
        name: crewName
    });

    /**
     * 크루 목록
     * @param channelNo 채널 번호
     */

    const initialCrew = useCallback(async(channelNo, userNo) => {
        const crews = await get(`/crew/${channelNo}/${userNo}`);
        dispatch(setCrew(crews));
        // console.log('@@@@@@@@@', crews)
        localStorage.setItem('crewList', JSON.stringify(crews));
    }, [channelNo])

    const initialTask = useCallback(async(channelNo) => {
        const tasks = await get(`/task/${channelNo}`);
        dispatch(setTask(tasks));
        localStorage.setItem('taskList', JSON.stringify(tasks));
    }, [channelNo])

    const initialProject = useCallback(async(channelNo) => {
        const projects = await get(`/project/${channelNo}`);
        dispatch(setProject(projects));
        localStorage.setItem('projectList', JSON.stringify(projects));
    }, [channelNo])

    const initialCrewUser = useCallback(async (channelNo) => {
        const assignList = await get(`/crew/user/${channelNo}`);
        dispatch(setCrewUser(assignList))},
        [dispatch]
    );


    /**
     * 크루 생성
     * @param {*} channelNo 크루를 생성할 채널 번호
     * @param {*} crew 생성할 크루 데이터
     */
    const onCreateCrew = useCallback(async(channelNo, crew, userNo) => {
        const result = await post(`/crew/${channelNo}/${userNo}`, crew);
        dispatch(addCrew(result.data));
    }, [])

    const onCreateChannel = useCallback(async(channel) => {
        const result = await post(`/channel`, channel);
        dispatch(addChannel(result.data));              
    }, [])

    const onClickCrew = async(crewNo, crewName) => {
        const result = await putJson(`/crew/${crewNo}`, JSON.stringify({no: userNo}))
        if(result.data === 'success')
            setChangeCrew((prevState) => ({...prevState, no: crewNo, name: crewName}))
        
        setFlag((prevFlag) => false);
    }

    useEffect(() =>{
        dispatch(setCREWFOCUS({no: changeCrew.no, name: changeCrew.name}));
    }, [changeCrew])

    /**
     * 초기 화면
     */
    useEffect(() => {
        if(channelNo !== null)
            initialCrew(channelNo, userNo);
    }, [channelNo,crewNo])

    useEffect(() => {
        if(channelNo !== null)
            initialTask(channelNo);
    }, [channelNo])

    useEffect(() => {
        if(channelNo !== null)
            initialProject(channelNo);
    }, [channelNo])

    useEffect(() => {
        if(channelNo !== null)
            initialCrewUser(channelNo);
    }, [channelNo])

    return (
    <>
        <Grid item xs={2} style={{ height: '842px',backgroundColor:"#1bc6d9"}}>
            <NavigationEct 
                onCreateCrew={onCreateCrew} 
                onCreateChannel={onCreateChannel}
                setFlag={setFlag} />
            <NavigationCrew 
                crewList={crewList} 
                onClickCrew={onClickCrew} />
        </Grid>
    </>
    );
}

export default React.memo(Navigation);