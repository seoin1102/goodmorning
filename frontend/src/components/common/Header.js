import React, {useState} from 'react';
import Grid from '@mui/material/Grid';
import ChannelSetting from '../modal/ChannelSetting';
import CrewSetting from '../modal/CrewSetting';
import HeaderItem from './header/HeaderItem';
import HeaderSearch from './header/HeaderSearch';
import HeaderUser from './header/HeaderUser';

export default function Header() {

    // modal state
    const [channelModalIsOpen, setChannelModalIsOpen] = useState(false);
    const [crewModalIsOpen, setCrewModalIsOpen] = useState(false);

    // css
    const channelStyle = {height:'60px', whiteSpace:'no-wrap', overflow:'hidden', textOverflow:'ellipsis'};
    const crewStyle = { height: '60px' };

    // modal click
    const onClickChannelModal = () => {
        setChannelModalIsOpen(prevChannelModalIsOpen => !prevChannelModalIsOpen);
    }
    const onClickCrewModal = () => {
        setCrewModalIsOpen(prevCrewModalIsOpen => !prevCrewModalIsOpen);
  }

    return (
        <Grid container>
            <HeaderItem itemName={'채널명'} modalIsOpen={channelModalIsOpen} customStyle={channelStyle} onClickModal={onClickChannelModal}>
                <ChannelSetting onClickModal={onClickChannelModal}/> 
            </HeaderItem>
            <HeaderItem itemName={'크루명'} modalIsOpen={crewModalIsOpen} customStyle={crewStyle} onClickModal={onClickCrewModal}>
                <CrewSetting onClickModal={onClickCrewModal}/> 
            </HeaderItem>
            <HeaderSearch/>
            <HeaderUser/>
        </Grid>
    );
}