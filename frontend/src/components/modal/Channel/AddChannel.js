import React, { useState } from 'react';
import { Modal, Form, Button   } from 'react-bootstrap';

function AddChannel({modalShow, onClickModal,onCreateChannel}) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const user = JSON.parse(localStorage.getItem('authUser'));
    const userNo = user.no;

    const channel = {name, description, masterChannelUserNo:userNo}

    return (
      <>
      <Modal show={modalShow} onHide={onClickModal}>
          <Modal.Header closeButton>
              <Modal.Title>채널 생성</Modal.Title>
          </Modal.Header>
          <Form  
                      //  onSubmit={(e) => {
                      //   e.preventDefault();
                      //   console.log("온클릭!", e.target[0].value, e.target[1].value)
                      //  }}
                      >
          <Modal.Body>

                  <Form.Group className="mb-3" controlId="channelForm.name">
                      <Form.Label>채널 이름</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Channel Name"
                        autoFocus
                        onChange={(e) =>{
                          setName(e.target.value)
                        }}
                      />
                  </Form.Group>
                  <Form.Group
                  className="mb-3"
                  controlId="crewForm.description"
                >
                  <Form.Label>채널 주제</Form.Label>
                  <Form.Control 
                  as="textarea" 
                  rows={3} 
                  placeholder={"Crew Description"}
                  onChange={(e) =>{
                    setDescription(e.target.value)
                  }}/>
                </Form.Group>

                  <Form.Group className="mb-3" controlId="email">
                      <Form.Label>초대</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="example@gmail.com"
                      />
                      </Form.Group>
                      <Button variant="outline-dark" onClick={onClickModal}>
                        전송
                      </Button>
          </Modal.Body>
          <Modal.Footer>
              <Button variant="outline-dark"  onClick={onClickModal} >
                취소
              </Button>
              <Button variant="outline-dark" onClick={() => {onCreateChannel(channel)
                                                            onClickModal();}} >
                저장
              </Button>
          </Modal.Footer>
          </Form>
      </Modal>
      </>
    );
}

export default AddChannel;