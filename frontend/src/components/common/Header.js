import Grid from '@mui/material/Grid';
import React, { useCallback, useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { get } from '../../apis/Axios';
import { setChannel } from '../../redux/channel';
import { setCHANNELFOCUS, setCREWFOCUS, setCHANNELCREWFOCUS } from '../../redux/focus';
import ChannelSetting from '../modal/Channel/ChannelSetting';
import CrewSetting from '../modal/Crew/CrewSetting';
import HeaderItem from './header/HeaderItem';
import HeaderSearch from './header/HeaderSearch';
import HeaderUser from './header/HeaderUser';
import {getLocalStorageAuthUser} from '../../apis/Fetch';


function Header() {
    const [totalSum, setTotalSum] = useState(0);
    // modal state
    const [channelModalIsOpen, setChannelModalIsOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const user = getLocalStorageAuthUser();
    const userNo = user.no;

    console.log("zzzzzzzzaaa" + JSON.stringify(user))

     const dispatch = useDispatch();
     const channelList = useSelector(state => (state.channel), shallowEqual);

    const channelName = useSelector(state => {
        return state.focus.channelName;
    }, shallowEqual);

    const channelNo = useSelector(state => {
        return state.focus.channelNo;
    }, shallowEqual);

    // const [changeChannel, setChangeChannel] = useState({
    //     no: channelNo,
    //     name: channelName
    // })
   
    /**
     * 채널 목록
     * @param userNo 채널 번호
     */
    const initialChannel = useCallback(async(channelNo, userNo) => {
      const channels = await get(`/channel/${channelNo}/${userNo}`);
      dispatch(setChannel(channels));
      }, [channelNo])

    const initialFocus = useCallback(async(userNo) => {
        const Focus = await get(`/channel/${userNo}`);
        const {no, name, crewNo, crewName} = Focus[0];
        dispatch(setCHANNELCREWFOCUS({
            channelName: name, 
            channelNo: no,
            crewName: crewName,
            crewNo: crewNo
        }))
        // dispatch(setCHANNELFOCUS({name: name, no: no}));
        // dispatch(setCREWFOCUS({name: crewName, no: crewNo}));
    }, [])

    const initialUser = useCallback(async() => {
        const result = await get(`/user/email/${channelNo}`);
        setUsers(() => [].concat(result));
    }, [users, channelNo])

    const onChangeChannel = useCallback(async(channelNo, userNo) => {
        const result = await get(`/channel/change/${channelNo}/${userNo}`);
        const {no, name, crewNo, crewName} = result[0];
        dispatch(setCHANNELCREWFOCUS({
            channelName: name, 
            channelNo: no,
            crewName: crewName,
            crewNo: crewNo
        }))
        // dispatch(setCHANNELFOCUS({name: name, no: no}));
        // dispatch(setCREWFOCUS({name: crewName, no: crewNo}));
    }, [])

    // const onChangeChannel = (channelNo, channelName) => {
    //     setChangeChannel((prevState) => ({...prevState, no: channelNo, name: channelName}))
    //     // setChangeChannelNo(channelNo);
    //     // setChangeChannelName(channelName);
    //     //dispatch(setCHANNELFOCUS({no: changeChannelNo, name: changeChannelName}));
    //    // console.log("sdafasf ",changeChannelNo," asdafaf",changeChannelName);
    // }

    // useEffect(() =>{
    //     dispatch(setCHANNELFOCUS({no: changeChannel.no, name: changeChannel.name}));
    // }, [changeChannel])
    
    useEffect(() => {
        if (channelNo === null)
            initialFocus(userNo);
        
        if (channelNo !== null)
            initialChannel(channelNo,userNo);  
      }, [channelNo])
        

    // css
    // 이넘 땜에 최적화 안됨 --> css 파일로 만들기
    const channelStyle = {height:'60px', whiteSpace:'no-wrap', overflow:'hidden', textOverflow:'ellipsis'};
    
    

    // const initialUser = useCallback(async(userNo) => {
    //     const result = await get(`/user/email/${userNo}`);
    //     console.log(result);
    //     setUsers((prevUsers) => prevUsers.concat(result));

    // }, [users])
    // modal click
    const onClickChannelModal = useCallback(() => {
        setChannelModalIsOpen(prevChannelModalIsOpen => !prevChannelModalIsOpen);
        initialUser();
    }, [channelNo, users])


    return (
        <Grid container style={{backgroundColor:'#1bc6d9', color:'white', borderBottom:'solid 1px #f7f7fa'}}>            
            <HeaderItem itemName={channelName} modalIsOpen={channelModalIsOpen} customStyle={channelStyle} onClickModal={onClickChannelModal}>
                <ChannelSetting modalShow={channelModalIsOpen} onClickModal={onClickChannelModal} users={users} initialUser={initialUser}/>
            </HeaderItem>
            <HeaderSearch/>
            <HeaderUser user={user} channelList ={channelList} onChangeChannel={onChangeChannel} totalSum={totalSum} setTotalSum={setTotalSum}/>
        </Grid>
    );
}

export default React.memo(Header);