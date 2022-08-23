import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

function CrewSetting_set() {


    return (
      <>
        <Modal.Body>
            <Form>
            <Form.Group className="mb-3">
                <Button variant="outline-dark"  >
                    초대 권한 설정
                  </Button>
                  </Form.Group>
                  <Form.Group className="mb-3">
                  <Button variant="outline-dark"  >
                    강퇴 권한 설정
                  </Button>
                  </Form.Group>
                <Form.Group className="mb-3">
                <Button variant="outline-dark" onClick={""} >
                    이 크루 삭제
                  </Button>
                  </Form.Group>
            </Form>
        </Modal.Body>
      
     </>
    );
}

export default CrewSetting_set;