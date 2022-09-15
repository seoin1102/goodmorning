import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import React, { useCallback, useState } from 'react';
import AddCrew from '../../modal/Crew/AddCrew';

import { Collapse, ListItemButton } from '@mui/material';
import { NavLink } from 'react-router-dom';
import arrowDownIcon from '../../../assets/icons/keyboard_arrow_down.svg';
import arrowUpIcon from '../../../assets/icons/keyboard_arrow_up.svg';
import NavigationEctItem from './NavigationEctItem';

function NavigationEct({onCreateCrew, onCreateChannel, taskList, setFlag }) {
    // modal state
    const [addChannelModalShow, setAddChannelModalShow] = useState(false);
    const [addCrewModalShow, setAddCrewModalShow] = useState(false);
    // const [reservModalShow, setReservModalShow] = useState(false);
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

    // const onClickReservModal = useCallback(() => {
    //     setReservModalShow(prevReservModalShow => !prevReservModalShow);
    // }, [])

    // const list = {
    //   overflowY: "auto",
    //   margin: 0,
    //   padding: 0,
    //   listStyle: "none",
    //   height: "100%",
    //   '&::-webkit-scrollbar': {
    //     width: '0.4em'
    //   },
    //   '&::-webkit-scrollbar-track': {
    //     boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    //     webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    //   },
    //   '&::-webkit-scrollbar-thumb': {
    //     backgroundColor: 'rgba(0,0,0,.1)',
    //     outline: '1px solid slategrey'
    //   }
    // }

    return (
        <>

        <ListItemButton onClick={handleClick} style={{fontSize:'20px', padding:'10px', fontStyle:'bold', borderBottom:'solid 0.5px #5CD1E5',color:'white'}}>
        <Grid item xs={12} textAlign={'center'} style={{fontFamily:'SUIT-Medium'}}> 기능 </Grid>

        {open ? <img src={arrowUpIcon}/> : <img src={arrowDownIcon} />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
        <List style={{height: '300px', overflow: 'auto', listStyle: "none"}}>
            
            {/* <NavigationEctItem userName={"Remy Sharp"} itemName={"채널 생성"} onClickModal={onClickAddChannelModal}>
                <AddChannel modalShow={addChannelModalShow} onClickModal={onClickAddChannelModal} onCreateChannel={onCreateChannel} /> 
            </NavigationEctItem> */}
            <NavigationEctItem userName={"Alice"} itemName={"채널 생성"} onClickModal={onClickAddCrewModal}>
                <AddCrew modalShow={addCrewModalShow} onClickModal={onClickAddCrewModal} onCreateCrew={onCreateCrew} /> 
            </NavigationEctItem>
            {/* <NavigationEctItem userName={"Cindy Baker"} itemName={"예약 메시지"} onClickModal={onClickReservModal}>
                <Reserv modalShow={reservModalShow} onClickModal={onClickReservModal}/> 
            </NavigationEctItem> */}


            <NavLink to={"/fileshare"} style={{textDecoration:'none', color: 'white'}} onClick={() => {setFlag((prevFlag)=> true)}}>
            <NavigationEctItem itemName={"파일 공유"}/>
            </NavLink>
            <NavLink to={"/project"} style={{textDecoration:'none', color: 'white'}} onClick={() => setFlag((prevFlag)=> true)}>
            <NavigationEctItem itemName={"프로젝트 달력"}/>
            </NavLink>
            <NavLink to={"/task"} style={{textDecoration:'none', color: 'white'}} onClick={() => setFlag((prevFlag)=> true)}>
            <NavigationEctItem itemName={"업무 달력"}/>
            </NavLink>
        </List>
        </Collapse>
        <Divider />
        </>
    );
}

export default React.memo(NavigationEct);