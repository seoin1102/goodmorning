import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import NavigationItem from './NavigationItem';
import arrowDownIcon from '../../../assets/icons/keyboard_arrow_down.svg';
import arrowUpIcon from '../../../assets/icons/keyboard_arrow_up.svg';
import { Collapse, ListItemButton } from '@mui/material';

// 데이터 받아오면 NavigationItem.map으로 반복문 실행해서 출력
function NavigationDM() {
    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };
    
    return (
        <>
        
        <ListItemButton onClick={handleClick} style={{fontSize:'20px', padding:'10px', fontStyle:'bold',borderTop:'solid 1.5px white', borderBottom:'solid 1.5px white',color:'white'}}>
        <Grid item xs={12}>다이렉트 메시지</Grid>
        {open ? <img src={arrowUpIcon}/> : <img src={arrowDownIcon} />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
    <List style={{height: '180px', overflow: 'auto'}}>
        <NavigationItem  navLink={"/chat/room"} crewName={"김현석"} secondary={"online"} />
        <NavigationItem  navLink={"/chat/room"} crewName={"김서인"} secondary={"online"} />
        <NavigationItem  navLink={"/chat/room"} crewName={"김휘민"} secondary={"online"} />
        <NavigationItem  navLink={"/"} crewName={"최시창"} secondary={"online"} />
    </List>
    </Collapse>
    </>
    );
}

export default React.memo(NavigationDM);