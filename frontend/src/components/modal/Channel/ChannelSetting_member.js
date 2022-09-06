import { Autocomplete, Divider, List, TextField } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Dropdown, Form, ListGroup, Modal } from 'react-bootstrap';

function ChannelSetting_member({users, onClickModal, setTab, channelNo,onClickChannelInvite}) {
    const [value, setValue] = useState();
    const [profileModalShow, setProFileModalShow] = useState(false);
  
    const onClickProfileModal = useCallback(() => {
      setProFileModalShow(prevprofileModalShow => !prevprofileModalShow);
    }, [])

    useEffect(() => {

    },[users])

    return (
      <>
               
        <Modal.Body>
            <Form>
            <Form.Group className="mb-3" controlId="channelForm.invite">
                    <Form.Label>사용자 추가</Form.Label>
                    <Form.Control
                type="email"
                placeholder="example@gmail.com"
                
                onChange={(e) =>{
                    setValue(e.target.value)
                }}
                value={value || ''}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="channelForm.footer">
            <Button variant="outline-dark" onClick={() => {onClickChannelInvite(channelNo,value)
                                                            setValue("")}}
                                                 >
                    추가
                    </Button>
                    </Form.Group>
                      <Form.Group className="mb-3" controlId="user">
                      <Form.Label>워크스페이스 멤버</Form.Label>
                <ListGroup style={{height:"200px",overflow:"auto"}}>
                  {users.map((user)=><ListGroup.Item key={user.no}>{user.name} ({user.email})</ListGroup.Item>)}
                </ListGroup>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark"  onClick={() => {onClickModal()
                              setTab(0)
                              }}
                              onKeyDown={(e) => { if(e.key === 'Enter') 
                                           {onClickModal()
                                            setTab(0)}}} >
            확인
          </Button>
      </Modal.Footer>
  
     </>
    );
}

export default ChannelSetting_member;