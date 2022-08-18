import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';


function ChannelSetting_info() {


    return (
    <>
        <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="crewForm.name">
                  <Form.Label>채널 이름</Form.Label>
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
                  <Form.Label>채널 주제</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder={"Crew Description"}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="crewForm.name">
                      <Form.Label>초대</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="example@gmail.com"
                      />
                </Form.Group>
                <Form.Group className="mb-3" controlId="crewForm.name">
                <Button variant="outline-dark" type="submit" onClick={(e) => {
                  
                  console.log("zz");}}>
                        전송
                      </Button>
                      </Form.Group>
                  <Form.Group className="mb-3">
                <Button variant="outline-dark" type="submit" >
                    이 채널에서 나가기
                  </Button>
                  </Form.Group>
            </Form>
        </Modal.Body>
        
    </>
    );
}

export default ChannelSetting_info;