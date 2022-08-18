import React from 'react'; 
import {NavLink} from "react-router-dom";

import { Button, Form, Row, Col, Card, Dropdown, DropdownButton, InputGroup} from 'react-bootstrap';



function SignIn({callback, saveEmailcheck, callbackCheckSaveEmailStatus}) {

  const onChangeSaveEmailcheck = e => {
    const status = e.target.value === 'no' ? 'yes' : 'no';
    callbackCheckSaveEmailStatus(status);
  }

  return (
    <div className="SignIn">
     <div className="card-title text-uppercase text-center py-3"></div>
     <Card className='card card-authentication1 mx-auto my-5'>
      <Card.Body>
     <Form onSubmit={e => {
              e.preventDefault();
              callback(e.target.email.value, e.target.passwd.value);
            }}>
     <Col xs="auto" className="my-5">
     <Card.Text className="card-title text-uppercase text-center py-3">
      Sign In
      </Card.Text>
      <Form.Group className="form-group" >
        <Form.Label htmlFor="inlineFormInputGroup">Email address</Form.Label>
        <div className="position-relative has-icon-right">
        
        <InputGroup className="mb-2">
          <Form.Control className='form-control input-shadow' type="email" placeholder="이메일을 입력해주세요" id="email" required/>
            <InputGroup.Text><i className="icon-envelope-open"></i></InputGroup.Text>
          </InputGroup>
        
        </div>
      </Form.Group>

     
          <Form.Label htmlFor="inlineFormInputGroup" >
            Password
          </Form.Label>
          <InputGroup className="mb-2">
          <Form.Control type="password" id="passwd" className="form-control input-shadow" placeholder="비밀번호를 입력해주세요" required/>
            <InputGroup.Text><i className="icon-lock"></i></InputGroup.Text>
          </InputGroup>
       

      <Form.Group className="form-group">
      <Row className="align-items-center">
        <Col sm='6'>
        <Form.Check type="checkbox" label="아이디 저장" id="checkId" value={saveEmailcheck} checked={saveEmailcheck==='yes'} onChange={onChangeSaveEmailcheck}/>
        </Col>
        <Col sm='6'>
        <NavLink to={'/ResetPw'}>
          <Button className='form-group text-right' variant="link" >
          비밀번호 찾기
          </Button>
        </NavLink>
      </Col>
      </Row>
      
      </Form.Group>

      
      <Button className="btn btn-light btn-block" type="submit">
      로그인
      </Button>
      </Col>

    </Form>
    </Card.Body>
    
    <Card.Footer className="card-footer text-center py-3" >
    <Row className="align-items-center">
        <Col sm='6'>
        <Card.Text>회원이 아니신가요?</Card.Text>
        </Col>
        <Col sm='6'>
        <NavLink to={'/signup'}>
          <Button className='text-warning mb-0' variant="link">
          회원가입하기
          </Button>
        </NavLink>
      </Col>
      </Row>
      </Card.Footer>
    </Card>
    </div>
  );
}

export default SignIn;
