import { Autocomplete, Divider, List, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Button, Dropdown, Form, ListGroup, Modal } from 'react-bootstrap';

function CrewSetting_member({users, onClickModal, setTab, onClickCrewInvite}) {

  const [value, setValue] = useState([]);

  console.log(users);
    return (
      <>
               
        <Modal.Body>
            <Form>
            <Form.Group className="mb-3" controlId="channelForm.invite">
                      <Form.Label>사용자 추가</Form.Label>
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
                <Button variant="outline-dark" onClick={() => onClickCrewInvite(value)} >
                        전송
                      </Button>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="user">
                      <Form.Label>멤버</Form.Label>
                <ListGroup style={{height:"200px",overflow:"auto"}}>
                  {users.map((user)=><ListGroup.Item key={user.no}>{user.name} ({user.email})</ListGroup.Item>)}
                </ListGroup>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark"  onClick={() => {onClickModal()
                              setTab(0)
                              }} >
            취소
          </Button>
          <Button variant="outline-dark"  >
            변경사항 저장
          </Button>
      </Modal.Footer>
  
     </>
    );
}

export default CrewSetting_member;