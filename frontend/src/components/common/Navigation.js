import React, { useEffect, useCallback, useState } from 'react';
import { get, post, put, putJson } from '../../apis/Axios';
import { useSelector, useDispatch, shallowEqual  } from 'react-redux';
import { setCrew, addCrew, deleteCrew } from '../../redux/crew';
import Grid from '@mui/material/Grid';
import NavigationCrew from './navigation/NavigationCrew';
import NavigationDM from './navigation/NavigationDM';
import NavigationEct from './navigation/NavigationEct';
import { setCREWFOCUS } from '../../redux/focus';
import { addChannel } from '../../redux/channel';

function Navigation() {

    const dispatch = useDispatch();
    const crewList = useSelector(state => (state.crew), shallowEqual);
    const user = JSON.parse(localStorage.getItem('authUser'));
    const userNo = user.no;
    const channelNo = useSelector(state => (state.focus.channelNo), shallowEqual);

    const crewNo = useSelector(state => (state.focus.crewNo), shallowEqual);
    const crewName = useSelector(state => (state.focus.crewName), shallowEqual);
    const [changeCrew, setChangeCrew] = useState({
        no: crewNo,
        name: crewName
    });
    console.log("aaaaaaaaaaaaaaaa", crewList)
    // console.log("Zz" + channelNo);
    /**
     * 크루 목록
     * @param channelNo 채널 번호
     */

    const initialCrew = useCallback(async(channelNo, userNo) => {
        const crews = await get(`/crew/${channelNo}/${userNo}`);
        console.log("uuuuuuuuuuuuuuuuuu", channelNo, userNo, crews)
        dispatch(setCrew(crews));
    }, [channelNo])

    /**
     * 크루 생성
     * @param {*} channelNo 크루를 생성할 채널 번호
     * @param {*} crew 생성할 크루 데이터
     */
    const onCreateCrew = useCallback(async(channelNo, crew, userNo) => {
        await post(`/crew/${channelNo}/${userNo}`, crew);
        dispatch(addCrew(crew));
        console.log(channelNo+"::fsdfdsf "+ " user ::" + userNo + "crew ::" + crew)
    }, [])

    const onCreateChannel = useCallback(async(channel) => {
        const result = await post(`/channel`, channel);

        console.log("############", result);
        dispatch(addChannel(result.data));
        console.log(channel)
    }, [])

    const onClickCrew = async(crewNo, crewName) => {
        console.log("#####", userNo, "aaaaaa", crewNo)
        const result = await putJson(`/crew/${crewNo}`, JSON.stringify({no: userNo}))
        console.log("#####", result)
        if(result.data === 'success')
            setChangeCrew((prevState) => ({...prevState, no: crewNo, name: crewName}))
    }

    useEffect(() =>{
        console.log("zzzzzzzzz" + changeCrew.no + "aaaaa" + changeCrew.name)
        dispatch(setCREWFOCUS({no: changeCrew.no, name: changeCrew.name}));
    }, [changeCrew])

    /**
     * 초기 화면
     */
    useEffect(() => {

        if(channelNo !== null){
        initialCrew(channelNo,userNo);
        }
        console.log("mount");

        return () => (console.log('unmount'))
    }, [channelNo])

    return (
    <>
        <Grid item xs={2} style={{ height: '840px',backgroundColor:"#283249 "}}>
            <NavigationEct onCreateCrew={onCreateCrew} onCreateChannel={onCreateChannel}/>
            <NavigationCrew crewList={crewList} onClickCrew={onClickCrew} />
            <NavigationDM />
        </Grid>
    </>
    );
}

export default React.memo(Navigation);