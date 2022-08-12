import React from 'react';
import { Modal, Form, Button   } from 'react-bootstrap';

function AddChannel({modalShow, onClickModal}) {
    return (
      <>
      <Modal show={modalShow} onHide={onClickModal}>
          <Modal.Header closeButton>
              <Modal.Title>채널 생성</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form>
                  <Form.Group className="mb-3" controlId="channelForm.name">
                      <Form.Label>채널 이름</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Channel Name"
                        autoFocus
                      />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="channelForm.teamName">
                      <Form.Label>크루 이름</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Crew Name"
                      />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="crewForm.name">
                      <Form.Label>초대</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="example@gmail.com"
                      />
                      <Button variant="outline-dark" type="submit" >
                        전송
                      </Button>
                  </Form.Group>
              </Form>
          </Modal.Body>
          <Modal.Footer>
              <Button variant="outline-dark" type="submit" onClick={onClickModal} >
                취소
              </Button>
              <Button variant="outline-dark" type="submit" >
                저장
              </Button>
          </Modal.Footer>
      </Modal>
      </>
    );
}

export default AddChannel;