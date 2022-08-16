import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

function CrewSetting({modalShow,onClickModal}) {


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
                <Form.Group className="mb-3">
                <Button variant="outline-dark" type="submit" >
                    초대 권한 설정
                  </Button>
                  </Form.Group>
                  <Button variant="outline-dark" type="submit" >
                    강퇴 권한 설정
                  </Button>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="outline-dark" type="submit" onClick={onClickModal} >
              취소
            </Button>
            <Button variant="outline-dark" type="submit" >
              변경사항 저장
            </Button>
        </Modal.Footer>
    </Modal>     
     </>
    );
}

export default CrewSetting;