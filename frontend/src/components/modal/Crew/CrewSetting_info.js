import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

function CrewSetting_info() {


    return (
      <>
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
                <Form.Group className="mb-3">
                <Button variant="outline-dark" type="submit" >
                    이 크루에서 나가기
                  </Button>
                  </Form.Group>
            </Form>
        </Modal.Body>
     </>
    );
}

export default CrewSetting_info;