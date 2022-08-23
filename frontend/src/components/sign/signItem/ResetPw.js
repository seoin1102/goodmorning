import React from 'react'; 
import {NavLink} from "react-router-dom";

import { Button, Form, Row, Col, Card, Dropdown, DropdownButton, InputGroup} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeOpen} from '@fortawesome/free-solid-svg-icons'


function ResetPw({callback,errormessage}) {
  return (
    <div className="SignIn">
     <div style={{padding:'0 35%'}}>
        <Card bg='light' className='card card-authentication1 mx-auto my-5'>
        <Card.Body style={{height: '350px'}}>
            <Form onSubmit={e => {
                      e.preventDefault();
                      callback(e.target.email.value);
                    }}>
                <Col xs="auto" className="my-5">
                  <Card.Text className="card-title text-uppercase pb-2">
                    RESET PASSWORD
                  </Card.Text>
                    
                    <Form.Group  className="form-group">
                        <Form.Label htmlFor="inlineFormInputGroup">회원가입 시 작성했던 이메일을 입력해주세요. <br></br> 이메일로 임시비밀번호를 보내드립니다.</Form.Label>
                        <div className="position-relative has-icon-right">
                          <Form.Label htmlFor="inlineFormInputGroup">Email address</Form.Label>
                          <InputGroup className="mb-2">
                            <Form.Control className='form-control input-shadow' type="email" id="email" placeholder="이메일을 입력해주세요" required/>
                            <InputGroup.Text><FontAwesomeIcon icon={faEnvelopeOpen}></FontAwesomeIcon></InputGroup.Text>
                          </InputGroup>
                        </div>
                      </Form.Group>
                    <div className='text-center'>
                      <Button className="btn btn-light btn-block" style={{margin:'20px 0px -30px 0px' , width:'55%', height: '40px'}} size='sm' type="submit"  variant="outline-dark">
                        비밀번호 수정
                      </Button>
                      <div className='text-center'>
                        {
                          errormessage===''?
                          <><br/><br/></>:
                          <p style={{color:'red'}}>
                            <br/><br/>{errormessage}
                          </p>
                        }
                    </div>
                    </div>
                </Col>

            </Form>
        </Card.Body>
        
        <Card.Footer className="card-footer text-center py-3" >
        <NavLink to={'/signin'}>
            <Button className='mb-0' variant="outline-dark">
            로그인 페이지로 돌아가기
            </Button>
        </NavLink>
          </Card.Footer>
        </Card>
    </div>
    </div>
  );
}

export default ResetPw;
