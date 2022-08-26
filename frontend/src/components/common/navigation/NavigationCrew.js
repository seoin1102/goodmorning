import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import NavigationItem from './NavigationItem';
import { Collapse, ListItemButton } from '@mui/material';
import arrowDownIcon from '../../../assets/icons/keyboard_arrow_down.svg';
import arrowUpIcon from '../../../assets/icons/keyboard_arrow_up.svg';

// 많으면 화면 넘어가므로 스크롤 추가 해주기
function NavigationCrew({crewList,onClickCrew}) {
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
                
                (crewList !== null ?
                (crewList.length !== 0 ? 
                (crewList.map((crew, index) => 
                    <NavigationItem
                        key={index}
                        navLink={"/"}
                        crewName={crew.name}
                        crewNo={crew.no}
                        onClickCrew={onClickCrew} />)
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