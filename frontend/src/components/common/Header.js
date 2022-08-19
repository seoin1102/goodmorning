import Grid from '@mui/material/Grid';
import React, { useCallback, useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { get } from '../../apis/Axios';
import { setChannel } from '../../redux/channel';
import { setCHANNELFOCUS } from '../../redux/focus';
import ChannelSetting from '../modal/Channel/ChannelSetting';
import CrewSetting from '../modal/Crew/CrewSetting';
import HeaderItem from './header/HeaderItem';
import HeaderSearch from './header/HeaderSearch';
import HeaderUser from './header/HeaderUser';


function Header() {



    // modal state
    const [channelModalIsOpen, setChannelModalIsOpen] = useState(false);
    const [crewModalIsOpen, setCrewModalIsOpen] = useState(false);

    const user = JSON.parse(localStorage.getItem('authUser'));
    const userNo = user.no;

     const dispatch = useDispatch();
     const channelList = useSelector(state => (state.channel), shallowEqual);

    const channelName = useSelector(state => {
        console.log("[SUBSCRIBE]",state.focus)
        return state.focus.channelName;
    }, shallowEqual);

    const channelNo = useSelector(state => {
        console.log("[SUBSCRIBE]",state.focus)
        return state.focus.channelNo;
    }, shallowEqual);

    /**
     * 채널 목록
     * @param userNo 채널 번호
     */
    const initialChannel = useCallback(async(channelNo,userNo) => {
        console.log("ㅁㅁ");
      const channels = await get(`/channel/${channelNo}/${userNo}`);
      dispatch(setChannel(channels));
      }, [dispatch])

    const initialFocus = useCallback(async(userNo) => {
        const channelFocus = await get(`/channel/${userNo}`);
        const {name, no} = channelFocus[0];
        dispatch(setCHANNELFOCUS({name: name, no: no}));
        console.log("[디스패치]", channelFocus);
    }, [dispatch])

    useEffect(() => {
        initialFocus(userNo);
        initialChannel(2,userNo);
        console.log("mountㅋㅋ");
        return () => (console.log('unmount'))
      }, [])
    
    
    // css
    // 이넘 땜에 최적화 안됨 --> css 파일로 만들기 
    const channelStyle = {height:'60px', whiteSpace:'no-wrap', overflow:'hidden', textOverflow:'ellipsis'};
    const crewStyle = { height: '60px' };

    // modal click
    const onClickChannelModal = useCallback(() => {
        setChannelModalIsOpen(prevChannelModalIsOpen => !prevChannelModalIsOpen);
    }, [])

    const onClickCrewModal = useCallback(() => {
        setCrewModalIsOpen(prevCrewModalIsOpen => !prevCrewModalIsOpen);
    }, [])

    return (
        <Grid container>
            
            <HeaderItem itemName={channelName} modalIsOpen={channelModalIsOpen} customStyle={channelStyle} onClickModal={onClickChannelModal}>
                <ChannelSetting modalShow={channelModalIsOpen} onClickModal={onClickChannelModal}/> 
            </HeaderItem>
            {/* <HeaderItem itemName={"crewName"} modalIsOpen={crewModalIsOpen} customStyle={crewStyle} onClickModal={onClickCrewModal}>
                <CrewSetting modalShow={crewModalIsOpen} onClickModal={onClickCrewModal}/> 
            </HeaderItem> */}
            <HeaderSearch/>
            <HeaderUser user={user} channelList ={channelList} />
        </Grid>
    );
}

export default React.memo(Header);