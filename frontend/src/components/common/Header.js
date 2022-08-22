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

    //const [changeChannelNo, setChangeChannelNo] = useState(channelNo);
    //const [changeChannelName, setChangeChannelName] = useState(channelName);
    const user = JSON.parse(localStorage.getItem('authUser'));
    const userNo = user.no;

     const dispatch = useDispatch();
     const channelList = useSelector(state => (state.channel), shallowEqual);

    const channelName = useSelector(state => {
        console.log("[SUBSCRIBE]",state.focus)
        return state.focus.channelName;
    }, shallowEqual);

    const channelNo = useSelector(state => {
        return state.focus.channelNo;
    }, shallowEqual);

    const [changeChannel, setChangeChannel] = useState({
        no: channelNo,
        name: channelName
    })
   
    /**
     * 채널 목록
     * @param userNo 채널 번호
     */
    const initialChannel = useCallback(async(channelNo,userNo) => {
      const channels = await get(`/channel/${channelNo}/${userNo}`);
      dispatch(setChannel(channels));
      }, [dispatch])

    const initialFocus = useCallback(async(userNo) => {
        const channelFocus = await get(`/channel/${userNo}`);
        const {name, no} = channelFocus[0];
        dispatch(setCHANNELFOCUS({name: name, no: no}));
    }, [dispatch])

    const onChangeChannel = (channelNo, channelName) => {
        setChangeChannel((prevState) => ({...prevState, no: channelNo, name: channelName}))
        // setChangeChannelNo(channelNo);
        // setChangeChannelName(channelName);
        //dispatch(setCHANNELFOCUS({no: changeChannelNo, name: changeChannelName}));
       // console.log("sdafasf ",changeChannelNo," asdafaf",changeChannelName);
    }

    useEffect(() =>{
        dispatch(setCHANNELFOCUS({no: changeChannel.no, name: changeChannel.name}));
    }, [changeChannel])
    
    useEffect(() => {

        if (channelNo == null){
        initialFocus(userNo);
        }
        if (channelNo != null){
        initialChannel(channelNo,userNo);
        }

        console.log("mount:header");
        return () => (console.log('unmount:header'))
      }, [channelNo])
        
    // css
    // 이넘 땜에 최적화 안됨 --> css 파일로 만들기
    const channelStyle = {height:'60px', whiteSpace:'no-wrap', overflow:'hidden', textOverflow:'ellipsis'};

    // modal click
    const onClickChannelModal = useCallback(() => {
        setChannelModalIsOpen(prevChannelModalIsOpen => !prevChannelModalIsOpen);
    }, [])


    return (
        <Grid container>            
            <HeaderItem itemName={channelName} modalIsOpen={channelModalIsOpen} customStyle={channelStyle} onClickModal={onClickChannelModal}>
                <ChannelSetting modalShow={channelModalIsOpen} onClickModal={onClickChannelModal}/>
            </HeaderItem>
            <HeaderSearch/>
            <HeaderUser user={user} channelList ={channelList} onChangeChannel={onChangeChannel}/>
        </Grid>
    );
}

export default React.memo(Header);