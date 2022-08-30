import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import NavigationItem from './NavigationItem';
import { Collapse, ListItemButton } from '@mui/material';
import arrowDownIcon from '../../../assets/icons/keyboard_arrow_down.svg';
import arrowUpIcon from '../../../assets/icons/keyboard_arrow_up.svg';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

// 많으면 화면 넘어가므로 스크롤 추가 해주기
function NavigationCrew({crewList, onClickCrew}) {
    const chatAlarmList = useSelector(state => (state.chatAlarm));
    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };
    
    return (
    <>
        <ListItemButton onClick={handleClick} style={{fontSize:'20px', padding:'10px', fontStyle:'bold',borderTop:'solid 1.5px white', borderBottom:'solid 1.5px white',color:'white'}}>
        <Grid item xs={12} textAlign={'center'}>크루</Grid>
        {open ? <img src={arrowUpIcon}/> : <img src={arrowDownIcon} />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
        <List style={{height: '300px', overflow: 'auto'}}>
            {               
                (crewList !== null && chatAlarmList !== null ?
                (crewList.length !== 0 ? 
                (
                    
                crewList.map((crew, index) => {
                    let count;
                chatAlarmList.map((chatAlarm) => {
                   
                    if(crew.no === chatAlarm.crewNo) 
                        count = chatAlarm.count;                                       
                })

                return (<NavigationItem
                    key={index}
                    navLink={"/"}
                    crewName={crew.name}
                    crewNo={crew.no}
                    onClickCrew={onClickCrew}
                    chatAlarmCount={count} />)
})


                ) :
                '') : '')
            }
        </List>
        </Collapse>
        <Divider />
    </>
    );
}

export default React.memo(NavigationCrew);