import React, { useCallback,useState } from 'react';
import { Modal, Form, Button   } from 'react-bootstrap';
import { shallowEqual, useSelector } from 'react-redux';
import { getLocalStorageAuthUser } from '../../../apis/Fetch';
import defaultProfileImg from '../../../assets/images/default2.png'
import EditProfile from './Profile';

function Profile({modalShow, onClickModal, onCreateCrew}) {
  const [name,setName] = useState("");
  const user = getLocalStorageAuthUser();
  const userNo = user.no;
  const crew = {name}
  const channelNo = useSelector(state => (state.focus.channelNo), shallowEqual);

  <img src={defaultProfileImg} for="input-file"></img>

  const [editProfileModalShow, seteditProfileModalShow] = useState(false);
  const onClickeditProfileModal = useCallback(() => {
    seteditProfileModalShow(preveditProfileModalShow => !preveditProfileModalShow);
  }, [])

  return (
    <>
    <Modal show={modalShow} onHide={onClickModal}>
        <Modal.Header closeButton>
            <Modal.Title>내 프로필</Modal.Title>
        </Modal.Header>
        <Form>
        <Modal.Body >
                <div style={{textAlign:'center'}} >
                  <img src={defaultProfileImg} name='profileImg'></img>
                </div>

                <Form.Group className="mb-3" controlId="crewForm.name">
                  <Form.Label>{user.name}</Form.Label>
                </Form.Group>

                <Form.Group className="mb-3" controlId="crewForm.name">
                  <Form.Label>{user.email}</Form.Label>
                </Form.Group>

                <Form.Group className="mb-3" controlId="crewForm.name">
                  <Form.Label>{user.signUpDate?user.signUpDate:'값이 없음'}</Form.Label>
                </Form.Group>

                <Form.Group className="mb-3" controlId="crewForm.name">
                  <Form.Label>{user.job?user.job:'등록하지 않았습니다!'}</Form.Label>
                </Form.Group>

                <Form.Group className="mb-3" controlId="crewForm.name">
                  <Form.Label>{user.phoneNumber?user.phoneNumber:'등록하지 않았습니다!'}</Form.Label>
                </Form.Group>
            
        </Modal.Body>
        <Modal.Footer>
            <Button variant="outline-dark" type="button" onClick={onClickModal} >
              취소
            </Button>
            <Button variant="outline-dark" type="button" onClick={onClickeditProfileModal}>
               프로필 편집
            </Button>
            
        </Modal.Footer>
        </Form>
    </Modal>
    <EditProfile modalShow={editProfileModalShow} onClickModal={onClickeditProfileModal}/>
    </>
  );
}

export default Profile;