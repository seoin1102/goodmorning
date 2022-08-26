import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { NavLink } from "react-router-dom";
import { color } from '@mui/system';
import { List, ListItemButton } from '@mui/material';


function NavigationItem({navLink, crewName, secondary, crewNo, onClickCrew}) {

    
    return (
<>   <NavLink to={navLink} style={{textDecoration:'none'}}>
        {/* <List component="div" disablePadding> */}
        <ListItemButton sx={{ pl: 4 }} onClick={() => {onClickCrew(crewNo,crewName)}}>
            <ListItemIcon>
                <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{fontSize: '1rem', color: '#E2BA89', fontWeight: 'bold'}}  primary={crewName} />
            <ListItemText secondary={secondary} align="right" />
        </ListItemButton>
        {/* </List> */}
      
      </NavLink>

        {/* <NavLink to={navLink} style={{textDecoration:'none', color: 'black'}}>
        <ListItem button onClick={() => {onClickCrew(crewNo,crewName)}}>
            <ListItemIcon>
                <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
            </ListItemIcon>
            <ListItemText primary={crewName}>Remy Sharp</ListItemText>
            <ListItemText secondary={secondary} align="right"></ListItemText>
        </ListItem>
        </NavLink> */}

    </>
    );
}

export default React.memo(NavigationItem);