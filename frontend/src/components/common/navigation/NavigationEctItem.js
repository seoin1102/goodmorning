import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import hash2 from '../../../assets/icons/hash2.svg';
import Avatar from '@mui/material/Avatar';
import { Modal, Form, Button   } from 'react-bootstrap';
// import Modal from "react-modal";
// import ReactModal from "react-modal";

import AddCrew2 from '../../modal/Crew/AddCrew';

//ReactModal.setAppElement('body');

function NavigationEctItem({userName, itemName, onClickModal, children}) {
    return (
    <>
        <ListItem button key={userName} onClick={onClickModal}  >
        <img src={hash2}/>
            {/* <ListItemIcon>
                <Avatar alt={userName} src="https://material-ui.com/static/images/avatar/2.jpg" />
            </ListItemIcon> */}
            <ListItemText primary={itemName} style={{textDecoration:'none', color: 'white'}}></ListItemText>
        </ListItem>
        {children}
    </>
    );
}

export default React.memo(NavigationEctItem);