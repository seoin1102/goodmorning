import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { NavLink } from "react-router-dom";
import { color } from '@mui/system';
import { List, ListItemButton } from '@mui/material';


function NavigationItem({navLink, crewName, chatAlarmCount, crewNo, onClickCrew}) {
    // console.log("RRRRRRRRRRRRRRRRRRRRRR", chatAlarmCount)
    
    return (
        <NavLink to={navLink} style={{textDecoration:'none'}}>
            <ListItemButton sx={{ pl: 4 }} onClick={() => {onClickCrew(crewNo,crewName)}}>
                <ListItemIcon>
                    <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{fontSize: '1rem', color: '#E2BA89', fontWeight: 'bold'}}  primary={crewName} />
                <ListItemText secondary={!chatAlarmCount ? null : chatAlarmCount} align="right" />
            </ListItemButton>
        </NavLink>
    );
}

export default React.memo(NavigationItem);