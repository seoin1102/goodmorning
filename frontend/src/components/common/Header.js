import React, { useState, useCallback } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';
import ChannelSetting from '../modal/Channel/ChannelSetting';
import CrewSetting from '../modal/Crew/CrewSetting';
import HeaderItem from './header/HeaderItem';
import HeaderSearch from './header/HeaderSearch';
import HeaderUser from './header/HeaderUser';


function Header() {

    // modal state
    const [channelModalIsOpen, setChannelModalIsOpen] = useState(false);
    const [crewModalIsOpen, setCrewModalIsOpen] = useState(false);

    const channelList = useSelector(state => state.channel);
    const crewList = useSelector(state => state.crew);
    console.log(crewList.map((crew) => {crew.name}));
    

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
            
            <HeaderItem itemName={"channelName"} modalIsOpen={channelModalIsOpen} customStyle={channelStyle} onClickModal={onClickChannelModal}>
                <ChannelSetting modalShow={channelModalIsOpen} onClickModal={onClickChannelModal}/> 
            </HeaderItem>
            <HeaderItem itemName={"crewName"} modalIsOpen={crewModalIsOpen} customStyle={crewStyle} onClickModal={onClickCrewModal}>
                <CrewSetting modalShow={crewModalIsOpen} onClickModal={onClickCrewModal}/> 
            </HeaderItem>
            <HeaderSearch/>
            <HeaderUser/>
        </Grid>
    );
}

export default React.memo(Header);