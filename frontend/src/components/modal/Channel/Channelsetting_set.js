import React,{Fragment} from 'react';
import { Button, Form, Row, Col, CloseButton, Card, Modal } from 'react-bootstrap';


function ChannelSetting_member({onClickModal}) {


    return (
    <>
         <Modal.Body>
            <Form>
                <Form.Group className="mb-3">
                <Button variant="outline-dark" onClick={onClickModal} >
                  초대 권한 설정
                  </Button>
                  </Form.Group>
                  <Form.Group  className="mb-3">
                <Button variant="outline-dark"  onClick={onClickModal} >
                  강퇴 권한 설정
                  </Button>
                </Form.Group>
                  <Button variant="outline-dark" onClick={onClickModal} >
                  이 채널 삭제
                  </Button>
            </Form>
        </Modal.Body>
        
    </>
    );
}

export default ChannelSetting_member;