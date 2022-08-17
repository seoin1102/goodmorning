import { Divider, List, TextField } from '@mui/material';
import React from 'react';
import { Button, Dropdown, Form, ListGroup, Modal } from 'react-bootstrap';

function CrewSetting_member() {


    return (
      <>
               
        <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="email">
                        <Form.Label>사용자 추가</Form.Label>
                        <Form.Control
                          type="email"
                          onChange={(e) =>{
                            setValue3(e.target.value)
                        }}
                          placeholder="example@gmail.com"
                        />
                        
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                      <Button  variant="outline-dark" type="submit">
                        전송
                      </Button>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="user">
                      <Form.Label>멤버</Form.Label>
                <ListGroup style={{height:"200px",overflow:"auto"}}>
                  {/* {userList.map((user)=> {
                    <ListGroup.Item>{user.Name}</ListGroup.Item>
                  })} */}
                  
                  <ListGroup.Item>둘리</ListGroup.Item>
                  <ListGroup.Item>김서인</ListGroup.Item>
                  <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                  <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                  <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                  <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                  <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                  <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                  
                  <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup>
                </Form.Group>
            </Form>
        </Modal.Body>
  
     </>
    );
}

export default CrewSetting_member;