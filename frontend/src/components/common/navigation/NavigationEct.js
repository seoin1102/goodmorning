import React, { useState, useCallback } from 'react';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import AddChannel from '../../modal/Channel/AddChannel';
import AddCrew from '../../modal/Crew/AddCrew';
import Reserv from '../../modal/ReservationMessage';

import NavigationEctItem from './NavigationEctItem';
import NavigationItem from './NavigationItem';

function NavigationEct({onCreate}) {
    // modal state
    const [addChannelModalShow, setAddChannelModalShow] = useState(false);
    const [addCrewModalShow, setAddCrewModalShow] = useState(false);
    const [reservModalShow, setReservModalShow] = useState(false);

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
        <Grid item xs={12} >캘린더 등 기타기능 여기!</Grid>
        <List style={{height: '200px', overflow: 'auto'}}>
            
            <NavigationEctItem userName={"Remy Sharp"} itemName={"채널 생성"} onClickModal={onClickAddChannelModal}>
                <AddChannel modalShow={addChannelModalShow} onClickModal={onClickAddChannelModal} /> 
            </NavigationEctItem>
            <NavigationEctItem userName={"Alice"} itemName={"크루 생성"} onClickModal={onClickAddCrewModal}>
                <AddCrew modalShow={addCrewModalShow} onClickModal={onClickAddCrewModal} onCreate={onCreate} /> 
            </NavigationEctItem>
            <NavigationEctItem userName={"Cindy Baker"} itemName={"예약 메시지"} onClickModal={onClickReservModal}>
                <Reserv modalShow={reservModalShow} onClickModal={onClickReservModal}/> 
            </NavigationEctItem>
            <NavigationItem navLink={"/calendar"}  crewName={"캘린더"}>
            </NavigationItem>
            <NavigationItem navLink={"/reservation"}  crewName={"예약 메시지"}>
            </NavigationItem>
            <NavigationItem navLink={"/save"}  crewName={"저장된 메시지"}>
            </NavigationItem>
        </List>
        <Divider />
        </>
    );
}

export default React.memo(NavigationEct);