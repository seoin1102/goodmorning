import { Autocomplete, TextField } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { get } from '../../../apis/Axios';
import { setCHANNELFOCUS } from '../../../redux/focus';


function ChannelSetting_info({onClickHandler,channelName, onClickModal, channelNo,onClickChannelInvite}) {
  
  const [name, setName] = useState(channelName);
  const [value, setValue] = useState([]);

  console.log("zffaf",channelNo);


    return (
    <>
        <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="channelForm.name">
                  <Form.Label>채널 이름</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Crew Name"
                    autoFocus
                    onChange={(e) =>{
                      setName(e.target.value)
                    }}
                    defaultValue={channelName}
                    
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="channelForm.invite">
                      <Form.Label>초대</Form.Label>
                      <Form.Control
                    type="email"
                    placeholder="example@gmail.com"
                    autoFocus
                    onChange={(e) =>{
                      setValue(e.target.value)
                    }}
                    
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="channelForm.footer">
                <Button variant="outline-dark" onClick={() => onClickChannelInvite(channelNo,value)} >
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
        <Modal.Footer>
            <Button variant="outline-dark" onClick={onClickModal} >
              취소
            </Button>
            <Button variant="outline-dark" onClick={() => {onClickHandler(name)}} >
              변경사항 저장
            </Button>
        </Modal.Footer>
        
    </>
    );
}

export default ChannelSetting_info;