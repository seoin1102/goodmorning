import React, { useState } from 'react';
import { Modal, Form, Button   } from 'react-bootstrap';
import { shallowEqual, useSelector } from 'react-redux';
import { getLocalStorageAuthUser } from '../../../apis/Fetch';

function Profile({modalShow, onClickModal, onCreateCrew}) {
  const [name,setName] = useState("");
  const user = getLocalStorageAuthUser();
  const userNo = user.no;
  const crew = {name}
  const channelNo = useSelector(state => (state.focus.channelNo), shallowEqual);

  return (
    <>
    <Modal show={modalShow} onHide={onClickModal}>
        <Modal.Header closeButton>
            <Modal.Title>내 프로필 편집</Modal.Title>
        </Modal.Header>
        <Form>
        <Modal.Body>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Control 
                        type={'file'}
                        name={'uploadFile'}
                        placeholder={'프로필 사진 업로드'}
                         />
                    </Form.Group>
                <input type="file" id="input-file"/>
                <Form.Group className="mb-3" controlId="crewForm.name">
                  <Form.Label>성명</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Crew Name"
                    autoFocus
                    onChange={(e) =>{
                      setName(e.target.value)
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="crewForm.name">
                  <Form.Label>이메일</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Crew Name"
                    autoFocus
                    onChange={(e) =>{
                      setName(e.target.value)
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="crewForm.name">
                  <Form.Label>가입한 날짜</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Crew Name"
                    autoFocus
                    onChange={(e) =>{
                      setName(e.target.value)
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="crewForm.name">
                  <Form.Label>직함 또는 직업</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Crew Name"
                    autoFocus
                    onChange={(e) =>{
                      setName(e.target.value)
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="crewForm.name">
                  <Form.Label>전화 번호</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Crew Name"
                    autoFocus
                    onChange={(e) =>{
                      setName(e.target.value)
                    }}
                  />
                </Form.Group>
            
        </Modal.Body>
        <Modal.Footer>
            <Button variant="outline-dark" type="button" onClick={onClickModal} >
              취소
            </Button>
            <Button variant="outline-dark" type="button" onClick={(e) => {
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

export default Profile;