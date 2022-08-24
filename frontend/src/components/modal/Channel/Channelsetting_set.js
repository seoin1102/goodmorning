import React,{Fragment} from 'react';
import { Button, Form, Row, Col, CloseButton, Card, Modal } from 'react-bootstrap';


function ChannelSetting_member({onClickModal, onClickHandler}) {


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
              <Modal.Footer>
            <Button variant="outline-dark" onClick={onClickModal} >
              취소
            </Button>
            <Button variant="outline-dark" onClick={onClickHandler} >
              변경사항 저장
            </Button>
        </Modal.Footer> 
        
    </>
    );
}

export default ChannelSetting_member;