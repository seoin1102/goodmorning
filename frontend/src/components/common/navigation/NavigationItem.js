import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { NavLink } from "react-router-dom";
import { color } from '@mui/system';


function NavigationItem({navLink, crewName, secondary, crewNo, onClickCrew}) {

    
    
    return (
        <NavLink to={navLink} style={{textDecoration:'none', color: 'black'}}>
        <ListItem button onClick={() => {onClickCrew(crewNo,crewName)}}>
            <ListItemIcon>
                <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
            </ListItemIcon>
            <ListItemText primary={crewName}>Remy Sharp</ListItemText>
            <ListItemText secondary={secondary} align="right"></ListItemText>
        </ListItem>
        </NavLink>
    );
}

export default React.memo(NavigationItem);