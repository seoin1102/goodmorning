import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Modal from "react-modal";
import ReactModal from "react-modal";
import '../../../styles/scss/modal/modal.scss';

ReactModal.setAppElement('body');

function NavigationEctItem({userName, itemName, modalIsOpen, onClickModal, children}) {
    return (
    <>
        <ListItem button key={userName} onClick={onClickModal}>
            <ListItemIcon>
                <Avatar alt={userName} src="https://material-ui.com/static/images/avatar/2.jpg" />
            </ListItemIcon>
            <ListItemText primary={itemName}>Cindy Baker</ListItemText>
        </ListItem>
        <Modal
            isOpen={modalIsOpen}
            shouldCloseOnOverlayClick={ true }
            className="Modal"
            overlayClassName="Overlay"
            style={ {content: {width: 550}} }
            contentLabel="modal example"
            >
            {children}
        </Modal>
    </>
    );
}

export default React.memo(NavigationEctItem);