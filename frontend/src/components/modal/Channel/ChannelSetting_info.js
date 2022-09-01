import { Autocomplete, TextField } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { get } from '../../../apis/Axios';
import { setCHANNELFOCUS } from '../../../redux/focus';


function ChannelSetting_info({onClickHandler,channelName, onClickModal}) {
    const [name, setName] = useState(channelName);

    return (
    <>
        <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="channelForm.name">
                  <Form.Label>워크스페이스 이름</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="WorkSpace Name"
                    autoFocus
                    onChange={(e) =>{
                      setName(e.target.value)
                    }}
                    defaultValue={channelName}
                    />
                </Form.Group>
                  <Form.Group className="mb-3">
                <Button variant="outline-dark" onClick={onClickModal} >
                    이 워크스페이스에서 나가기
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