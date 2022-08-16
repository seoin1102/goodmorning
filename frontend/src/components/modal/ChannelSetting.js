import React,{Fragment} from 'react';
import { Button, Form, Row, Col, CloseButton, Card, Modal } from 'react-bootstrap';


function ChannelSetting({modalShow, onClickModal}) {


    return (
    <>
    <Modal show={modalShow} onHide={onClickModal}>
        <Modal.Header closeButton>
            <Modal.Title>채널 설정</Modal.Title>
        </Modal.Header>
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
                <Form.Group
                  className="mb-3"
                  controlId="crewForm.description"
                >
                  <Form.Label>공지사항</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder={"Crew Description"}/>
    
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
                <Form.Group  className="mb-3">
                <Button variant="outline-dark"  type="submit" >
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

export default ChannelSetting;