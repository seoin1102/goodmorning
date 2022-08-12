import React, { useState, useCallback } from 'react';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import AddChannel from '../../modal/AddChannel';
import AddCrew from '../../modal/AddCrew';
import Reserv from '../../modal/ReservationMessage';
import '../../../styles/scss/modal/modal.scss';
import NavigationEctItem from './NavigationEctItem';

function NavigationEct() {
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
        <List>
            <Grid item xs={12} >캘린더 등 기타기능 여기!</Grid>
            <NavigationEctItem userName={"Remy Sharp"} itemName={"채널 생성"} onClickModal={onClickAddChannelModal}>
                <AddChannel modalShow={addChannelModalShow} onClickModal={onClickAddChannelModal}/> 
            </NavigationEctItem>
            <NavigationEctItem userName={"Alice"} itemName={"크루 생성"} onClickModal={onClickAddCrewModal}>
                <AddCrew modalShow={addCrewModalShow} onClickModal={onClickAddCrewModal} /> 
            </NavigationEctItem>
            <NavigationEctItem userName={"Cindy Baker"} itemName={"예약메시지"} onClickModal={onClickReservModal}>
                <Reserv modalShow={reservModalShow} onClickModal={onClickReservModal}/> 
            </NavigationEctItem>
        </List>
        <Divider />
        </>
    );
}

export default React.memo(NavigationEct);