import React,{Fragment, useState} from 'react';
import { Button, Form, Row, Col, CloseButton, Card, InputGroup, Dropdown, NavItem, NavLink } from 'react-bootstrap';

import ModalLayout from './ModalLayout';


function AddMember({setModalIsOpen}) {

    return (
        <>
        <button onClick={ () => setModalIsOpen(true) }>modal</button>
            <br/><br/>
        <Modal
            isOpen={modalIsOpen}
            shouldCloseOnOverlayClick={ true }
            className="Modal"
            overlayClassName="Overlay"
            style={ {content: {width: 550}} }
            contentLabel="modal example">
            <ModalLayout />
        </Modal>
        </>
    );
}

export default AddMember;