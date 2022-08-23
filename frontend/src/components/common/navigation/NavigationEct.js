import React, { useState, useCallback } from 'react';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import AddChannel from '../../modal/Channel/AddChannel';
import AddCrew from '../../modal/Crew/AddCrew';
import Reserv from '../../modal/ReservationMessage';

import NavigationEctItem from './NavigationEctItem';
import NavigationItem from './NavigationItem';
import { Collapse, ListItemButton } from '@mui/material';
import { NavLink } from 'react-router-dom';

function NavigationEct({onCreateCrew, onCreateChannel}) {
    // modal state
    const [addChannelModalShow, setAddChannelModalShow] = useState(false);
    const [addCrewModalShow, setAddCrewModalShow] = useState(false);
    const [reservModalShow, setReservModalShow] = useState(false);
    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };
    // modal click
    const onClickAddChannelModal = useCallback(() => {
        setAddChannelModalShow(prevAddChannelModalShow => !prevAddChannelModalShow);
    }, [])

    const onClickAddCrewModal = useCallback(() => {
        setAddCrewModalShow(prevAddCrewModalShow => !prevAddCrewModalShow);
    }, [])

    const onClickReservModal = useCallback(() => {
        setReservModalShow(prevReservModalShow => !prevReservModalShow);
    }, [])

    return (
        <>
        <ListItemButton onClick={handleClick} style={{fontSize:'20px', padding:'10px', fontStyle:'bold',borderTop:'solid 1.5px white', borderBottom:'solid 1.5px white',color:'white'}}>
        <Grid item xs={12}> 기능 </Grid>
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
        <List style={{height: '200px', overflow: 'auto'}}>
            
            <NavigationEctItem userName={"Remy Sharp"} itemName={"채널 생성"} onClickModal={onClickAddChannelModal}>
                <AddChannel modalShow={addChannelModalShow} onClickModal={onClickAddChannelModal} onCreateChannel={onCreateChannel} /> 
            </NavigationEctItem>
            <NavigationEctItem userName={"Alice"} itemName={"크루 생성"} onClickModal={onClickAddCrewModal}>
                <AddCrew modalShow={addCrewModalShow} onClickModal={onClickAddCrewModal} onCreateCrew={onCreateCrew} /> 
            </NavigationEctItem>
            <NavigationEctItem userName={"Cindy Baker"} itemName={"예약 메시지"} onClickModal={onClickReservModal}>
                <Reserv modalShow={reservModalShow} onClickModal={onClickReservModal}/> 
            </NavigationEctItem>

            <NavLink to={"/calendar"} style={{textDecoration:'none', color: 'black'}}>
            <NavigationEctItem crewName={"캘린더"} />
            </NavLink>
            
            <NavLink to={"/reservation"} style={{textDecoration:'none', color: 'black'}}>
            <NavigationEctItem  crewName={"예약 메시지"} />
            </NavLink>
            <NavLink to={"/save"} style={{textDecoration:'none', color: 'black'}}>
            <NavigationEctItem crewName={"저장된 메시지"} />
            </NavLink>
        </List>
        </Collapse>
        <Divider />
        </>
    );
}

export default React.memo(NavigationEct);