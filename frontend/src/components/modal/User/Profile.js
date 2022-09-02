import React, { useCallback,useRef,useEffect, useReducer, useState } from 'react';
import { Modal, Form, Button   } from 'react-bootstrap';
import { shallowEqual, useSelector } from 'react-redux';
import { put, putJson } from '../../../apis/Axios';
import { getLocalStorageAuthUser } from '../../../apis/Fetch';

function Profile({modalShow, onClickModal,profile, setProfile,uploadcheck}) {
  const user = getLocalStorageAuthUser();

  // const [profile, setProfile] = useState({
  //     name: null, 
  //     job: null,
  //     phoneNumber: null})

  const {name, job, phoneNumber} = profile
  const userinfo = {no: user.no, name, job, phoneNumber};
  const setUser = {no: user.no, email:user.email, name, passwd: null, signUpDate:user.signUpDate, job, phoneNumber, profileUrl:user.profileUrl, enable: true};
  const refForm = useRef(null);
  let file;

  const onClickUserUpdate = useCallback(async(userinfo,file) => {
      const result = await put(`/user/update`, userinfo);
      // if(result.data === 'success'){
      localStorage.setItem('authUser',JSON.stringify(setUser));
      await uploadcheck(file,userinfo.no);
      onClickModal();
      // }
  }, [profile])

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
                        ref={refForm}
                        onChange={(e)=>{
                          file = e.target['uploadFile'].files[0];
                        }}/>
                    </Form.Group>
                <Form.Group className="mb-3" controlId="crewForm.name">
                  <Form.Label>성명</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    autoFocus
                    onChange={(e) =>{
                      setProfile((prevProfile)=> ({
                        ...prevProfile, 
                        name: e.target.value
                      }))
                    }}
                    defaultValue={user.name}
                    onKeyDown={(e) => { 
                      if(e.key === 'Enter') 
                       { onClickUserUpdate(userinfo)}
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
                value={user.email}               
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
                    value={user.signUpDate}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="crewForm.name">
                  <Form.Label>직함 또는 직업</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Job"
                    autoFocus
                    onChange={(e) =>{
                      setProfile((prevProfile)=> ({
                        ...prevProfile, 
                        job: e.target.value
                      }))
                    }}
                    defaultValue={user.job}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="crewForm.name">
                  <Form.Label>전화 번호</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="PhoneNumber"
                    autoFocus
                    onChange={(e) =>{
                      setProfile((prevProfile)=> ({
                        ...prevProfile, 
                        phoneNumber: e.target.value
                      }))
                    }}
                    defaultValue={user.phoneNumber}
                  />
                </Form.Group>
            
        </Modal.Body>
        <Modal.Footer>
            <Button variant="outline-dark" type="button" onClick={onClickModal} >
              취소
            </Button>
            <Button variant="outline-dark" type="button" onClick={(e) => {
                                                            onClickUserUpdate(userinfo)
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