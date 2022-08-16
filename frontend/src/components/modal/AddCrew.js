import React from 'react';
import { Modal, Form, Button   } from 'react-bootstrap';

function AddCrew({modalShow, onClickModal}) {
  return (
    <>
    <Modal show={modalShow} onHide={onClickModal}>
        <Modal.Header closeButton>
            <Modal.Title>크루 생성</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="crewForm.name">
                  <Form.Label>크루 이름</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Crew Name"
                    autoFocus
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="crewForm.description"
                >
                  <Form.Label>크루 설명</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder={"Crew Description"}/>
                  </Form.Group>
                  <Button variant="outline-dark" type="submit" >
                    초대 권한 설정
                  </Button>
                
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

export default AddCrew;