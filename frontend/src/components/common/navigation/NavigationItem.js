import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { NavLink } from "react-router-dom";
import { color } from '@mui/system';
import { List, ListItemButton, Badge } from '@mui/material';


function NavigationItem({navLink, crewName, chatAlarmCount, crewNo, onClickCrew}) {
 
    return (
        <NavLink to={navLink} style={{textDecoration:'none'}}>
            <ListItemButton sx={{ pl: 4 }} onClick={() => {onClickCrew(crewNo,crewName)}}>
                <ListItemIcon>
                    <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                </ListItemIcon>
                
                    <ListItemText primaryTypographyProps = {{fontSize: '1rem', color: '#E2BA89', fontWeight: 'bold', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', width:'150px'}}  primary={crewName}
                         />
                    

                    <ListItemText secondary={<Badge 
                            badgeContent={!chatAlarmCount ? null : chatAlarmCount} 
                            color="warning"  sx={{ "& .MuiBadge-badge": { fontSize: 15, height: 20, minWidth: 20 } }}/>} align="center" /> 
                
            </ListItemButton>
        </NavLink>
    );
}

export default React.memo(NavigationItem);