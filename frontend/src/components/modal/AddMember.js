import React,{Fragment, useState} from 'react';
import { Button, Form, Row, Col, CloseButton, Card, InputGroup, Dropdown, NavItem, NavLink } from 'react-bootstrap';

import ModalLayout from './ModalLayout';


function AddMember({modalIsOpen, onClickModal}) {
    /**
     * 주석된 코드 현재 컴포넌트를 사용하는 부모한테로 옮기기
     */
    // const [addMemberModalIsOpen, setAddMemberModalIsOpen] = useState(false);
    // const onClickAddMemberModal = useCallback(() => {
    //     setAddMemberModalIsOpen(prevAddMemberModalIsOpen => !prevAddMemberModalIsOpen);
    // }, [])

    //   return ...
    //          ... 생략 ...
    //         <AddMember modalIsOpen={addMemberModalIsOpen} onClickModal={onClickAddMemberModal} />
    return (
        <>
        <button onClick={onClickModal}>modal</button>
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