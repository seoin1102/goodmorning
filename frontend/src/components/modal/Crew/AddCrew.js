import React, { useState } from 'react';
import { Modal, Form, Button   } from 'react-bootstrap';
import { shallowEqual, useSelector } from 'react-redux';
import { getLocalStorageAuthUser } from '../../../apis/Fetch';

function AddCrew({modalShow, onClickModal, onCreateCrew}) {
  const [name,setName] = useState("");
  const user = getLocalStorageAuthUser();
  const userNo = user.no;
  const crew = {name}
  const channelNo = useSelector(state => (state.focus.channelNo), shallowEqual);

  return (
    <>
    <Modal show={modalShow} onHide={onClickModal}>
        <Modal.Header closeButton>
            <Modal.Title>크루 생성</Modal.Title>
        </Modal.Header>
        <Form>
        <Modal.Body>
                <Form.Group className="mb-3" controlId="crewForm.name">
                  <Form.Label>크루 이름</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Crew Name"
                    autoFocus
                    onChange={(e) =>{
                      setName(e.target.value)
                    }}
                  />
                </Form.Group>
                  <Button variant="outline-dark" type="button" 
                  onClick ={(e) =>{e.preventDefault}} >
                    초대 권한 설정
                  </Button>
            
        </Modal.Body>
        <Modal.Footer>
            <Button variant="outline-dark" type="button" onClick={onClickModal} >
              취소
            </Button>
            <Button variant="outline-dark" type="button" onClick={(e) => {
                        onCreateCrew(channelNo,crew,userNo)
                        onClickModal()
                       }} >
              저장
            </Button>
            
        </Modal.Footer>
        </Form>
    </Modal>
    </>
  );
}

export default AddCrew;