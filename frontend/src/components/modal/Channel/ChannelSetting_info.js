import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setCHANNELFOCUS } from '../../../redux/focus';


function ChannelSetting_info({onChangeHandler, channelName, onClickModal}) {

    return (
    <>
        <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="crewForm.name">
                  <Form.Label>채널 이름</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Crew Name"
                    onChange={onChangeHandler}
                    defaultValue={channelName}
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
                <Button variant="outline-dark" onClick={onClickModal} >
                        전송
                      </Button>
                      </Form.Group>
                  <Form.Group className="mb-3">
                <Button variant="outline-dark" onClick={onClickModal} >
                    이 채널에서 나가기
                  </Button>
                  </Form.Group>
            </Form>
        </Modal.Body>
        {/* <Modal.Footer>
            <Button variant="outline-dark" onClick={onClickModal} >
              취소
            </Button>
            <Button variant="outline-dark" onClick={onChangeValue} >
              변경사항 저장
            </Button>
        </Modal.Footer> */}
        
    </>
    );
}

export default ChannelSetting_info;