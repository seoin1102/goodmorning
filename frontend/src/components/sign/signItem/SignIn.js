import React from 'react'; 
import {NavLink} from "react-router-dom";
import { Button, Form, Row, Col, Card, Dropdown, DropdownButton, InputGroup} from 'react-bootstrap';
import '../../../styles/css/body.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelopeOpen} from '@fortawesome/free-solid-svg-icons'

function SignIn({callback, errormessage}) {
  console.log("테스트 : " + errormessage)
  return (
    <div className="SignIn">
        <div style={{padding:'0 35%'}}>
      <Card bg='light' className='card card-authentication1 mx-auto my-5'>
      <Card.Body style={{height: '400px'}}>
        <Form onSubmit={e => {
                  e.preventDefault();
                  callback(e.target.email.value, e.target.passwd.value);
                }}>
        <Col xs="auto" className="my-5">
        <Card.Text className="card-title text-uppercase text-center py-3">
            Sign In
        </Card.Text>
        
        <Form.Group className="form-group" >
            <Form.Label htmlFor="inlineFormInputGroup">
                Email address
            </Form.Label>
            <div className="position-relative has-icon-right">      
                <InputGroup className="mb-2">
                    <Form.Control 
                      className='form-control input-shadow' 
                      type="email" 
                      placeholder="이메일을 입력해주세요" 
                      id="email" 
                      required/>
                    <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelopeOpen}></FontAwesomeIcon>
                    </InputGroup.Text>
                </InputGroup>         
            </div>
          </Form.Group>

          <Form.Group className="form-group">
              <Form.Label htmlFor="inlineFormInputGroup" >
                  Password
              </Form.Label>
              <InputGroup className="mb-2">
              <Form.Control 
                  type="password" 
                  id="passwd" 
                  className="form-control input-shadow" 
                  placeholder="비밀번호를 입력해주세요" 
                  required/>
                  <InputGroup.Text>
                      <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
                  </InputGroup.Text>
              </InputGroup>
          </Form.Group>

          <Form.Group className="form-group">
              <div className='text-center'>
                <Button 
                    className='form-group text-center btn-xs' 
                    style={{margin:'20px 0px -30px 0px' , width:'55%', height: '40px'}} 
                    size='sm' 
                    variant="outline-dark" 
                    type="submit">
                        로그인
                </Button>
              </div>        
          </Form.Group>

        <div className='text-center'>
            {
              errormessage===''?
              <><br/><br/></>:
              <p style={{color:'red'}}>
                <br/><br/>{errormessage}
              </p>
            }
        </div>
        </Col>
      </Form>
      </Card.Body>
      
      <Card.Footer className="card-footer text-center py-3" >
          <Row className="align-items-center">

              <Col sm='6'>
              <NavLink to={'/ResetPw'}>
                <Button 
                    className='form-group text-right' 
                    variant="outline-dark" >
                    비밀번호 찾기
                </Button>
              </NavLink>
              </Col>

              <Col sm='6'>
                <NavLink to={'/signup'}>
                  <Button 
                      className='mb-0' 
                      variant="outline-dark">
                  회원가입하기
                  </Button>
                </NavLink>
              </Col>

          </Row>
      </Card.Footer>

      </Card>
      </div>
    </div>
  );
}

export default SignIn;
