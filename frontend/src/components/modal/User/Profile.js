import React, { useCallback, useState } from 'react';
import { Modal, Form, Button   } from 'react-bootstrap';
import { shallowEqual, useSelector } from 'react-redux';
import { put, putJson } from '../../../apis/Axios';
import { getLocalStorageAuthUser } from '../../../apis/Fetch';

function Profile({modalShow, onClickModal}) {

  const user = getLocalStorageAuthUser();
  const userNo = user.no;

  const [name,setName] = useState("");
  const [job,setJob] = useState("");
  const [phoneNumber,setPhoneNumber] = useState("");
  const userinfo = {no: userNo, name, job, phoneNumber};

  const onClickUserUpdate = useCallback(async(userinfo) => {
    const result = await put(`/user/update`, userinfo);
    // if(result.data === 'success'){
    //   location.
    // }
}, [])


  
  
  const channelNo = useSelector(state => (state.focus.channelNo), shallowEqual);

  

  return (
    <>
    <Modal show={modalShow} onHide={onClickModal}>
        <Modal.Header closeButton>
            <Modal.Title>내 프로필 편집</Modal.Title>
        </Modal.Header>
        <Form>
        <Modal.Body>
                <input type="file" id="input-file"/>
                <Form.Group className="mb-3" controlId="crewForm.name">
                  <Form.Label>성명</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    autoFocus
                    onChange={(e) =>{
                      setName(e.target.value)
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="channelForm.invite">
                    <Form.Label>이메일</Form.Label>
                    <Form.Control
                type="email"
                placeholder="example@gmail.com"
                autoFocus
                readOnly
                value="ggg"               
                />
                <Form.Label>이메일은 변경할 수 없습니다.</Form.Label>
                </Form.Group>

                <Form.Group className="mb-3" controlId="crewForm.name">
                  <Form.Label>가입한 날짜</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="CreateDate"
                    autoFocus
                    readOnly
                    value="ggg"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="crewForm.name">
                  <Form.Label>직함 또는 직업</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Job"
                    autoFocus
                    onChange={(e) =>{
                      setJob(e.target.value)
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="crewForm.name">
                  <Form.Label>전화 번호</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="PhoneNumber"
                    autoFocus
                    onChange={(e) =>{
                      setPhoneNumber(e.target.value)
                    }}
                  />
                </Form.Group>
            
        </Modal.Body>
        <Modal.Footer>
            <Button variant="outline-dark" type="button" onClick={onClickModal} >
              취소
            </Button>
            <Button variant="outline-dark" type="button" onClick={(e) => {
                                                            onClickUserUpdate(userinfo)
                                                            onClickModal()
                                                          }}
                                                          onKeyDown={(e) => { 
                                                            if(e.key === 'Enter') 
                                                             { onClickUserUpdate(userinfo) 
                                                              onClickModal()}
                                                          }}
                       >
              저장
            </Button>
        </Modal.Footer>
        </Form>
    </Modal>
    </>
  );
}

export default Profile;