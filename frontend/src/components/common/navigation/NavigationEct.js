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
    const [addChannelModalIsOpen, setAddChannelModalIsOpen] = useState(false);
    const [addCrewModalIsOpen, setAddCrewModalIsOpen] = useState(false);
    const [reservModalIsOpen, setReservModalIsOpen] = useState(false);

    // modal click
    const onClickAddChannelModal = useCallback(() => {
        setAddChannelModalIsOpen(prevAddChannelModalIsOpen => !prevAddChannelModalIsOpen);
    }, [])

    const onClickAddCrewModal = useCallback(() => {
        setAddCrewModalIsOpen(prevAddCrewModalIsOpen => !prevAddCrewModalIsOpen);
    }, [])

    const onClickReservModal = useCallback(() => {
        setReservModalIsOpen(prevReservModalIsOpen => !prevReservModalIsOpen);
    }, [])

    return (
        <>
        <List>
            <Grid item xs={12} >캘린더 등 기타기능 여기!</Grid>
            <NavigationEctItem userName={"Remy Sharp"} itemName={"채널 생성"} modalIsOpen={addChannelModalIsOpen} onClickModal={onClickAddChannelModal}>
                <AddChannel onClickModal={onClickAddChannelModal}/> 
            </NavigationEctItem>
            <NavigationEctItem userName={"Alice"} itemName={"크루 생성"} modalIsOpen={addCrewModalIsOpen} onClickModal={onClickAddCrewModal}>
                <AddCrew onClickModal={onClickAddCrewModal}/> 
            </NavigationEctItem>
            <NavigationEctItem userName={"Cindy Baker"} itemName={"예약메시지"} modalIsOpen={reservModalIsOpen} onClickModal={onClickReservModal}>
                <Reserv onClickModal={onClickReservModal}/> 
            </NavigationEctItem>
        </List>
        <Divider />
        </>
    );
}

export default React.memo(NavigationEct);