import React from 'react';
import { Modal, Form, Button   } from 'react-bootstrap';

function AddCrew({modalShow, onClickModal, onCreate}) {

  return (
    <>
    <Modal show={modalShow} onHide={onClickModal}>
        <Modal.Header closeButton>
            <Modal.Title>크루 생성</Modal.Title>
        </Modal.Header>
        <Form onSubmit={(e) => {
                        e.preventDefault();
                        const {name, value} = e.target;
                        const data = {[name]: value}
                        onCreate(e.target[0].value)
                        console.log(e.target[0].value)
                       }}>
        <Modal.Body>
                <Form.Group className="mb-3" controlId="crewForm.name">
                  <Form.Label>크루 이름</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Crew Name"
                    autoFocus
                    onChange={(e) =>{
                      setValue(e.target.value)
                  }}
                  />
                </Form.Group>
                  <Button variant="outline-dark" type="submit" >
                    초대 권한 설정
                  </Button>
            
        </Modal.Body>
        <Modal.Footer>
            <Button variant="outline-dark" type="submit" onClick={onClickModal} >
              취소
            </Button>
            <Button variant="outline-dark" type="submit" >
              저장
            </Button>
            
        </Modal.Footer>
        </Form>
    </Modal>
    </>
  );
}

export default AddCrew;