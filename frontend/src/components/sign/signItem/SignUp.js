import React from 'react'; 
import {NavLink} from "react-router-dom";
import { Button, Form, Row, Col, Card, Dropdown, DropdownButton, InputGroup} from 'react-bootstrap';


function SignUp({callback}) {
  
  return (

    <div className="SignUp">
       <div style={{padding:'0 700px'}}>
    
        <Card className='card card-authentication1 mx-auto my-4'>
          <Card.Body>
            <Form onSubmit={e => {
                e.preventDefault();
                callback(e.target.email.value, e.target.name.value, e.target.passwd.value);
              }}>

      <Col xs="Wauto" className="my-5">
        <Card.Text className="card-title text-uppercase text-center py-3">
        Sign Up
        </Card.Text>
        <Form.Group  className="form-group">
          <Form.Label htmlFor="inlineFormInputGroup">Email address</Form.Label>
          <div className="position-relative has-icon-right">
          
          <InputGroup className="mb-2">
            <Form.Control className='form-control input-shadow' id="email" type="email"  placeholder="이메일을 입력해주세요" required />
              <InputGroup.Text><i className="icon-envelope-open"></i></InputGroup.Text>
            </InputGroup>

          <Form.Label htmlFor="inlineFormInputGroup">Name</Form.Label>
          <InputGroup className="mb-2">
          <Form.Control className='form-control input-shadow' id="name" type="name"  placeholder="이름을 입력해주세요" required/>
            <InputGroup.Text><i className="icon-user"></i></InputGroup.Text>
          </InputGroup>  
          
          </div>
        </Form.Group>

      
            <Form.Label htmlFor="inlineFormInputGroup" >
              Password
            </Form.Label>
            <InputGroup className="mb-2">
            <Form.Control type="password" id="passwd" className="form-control input-shadow"  placeholder="비밀번호를 입력해주세요" required/>
              <InputGroup.Text><i className="icon-lock"></i></InputGroup.Text>
            </InputGroup>
  

      

            <div className='text-center'>
          <Button className="btn btn-outline-dark" style={{margin:'20px 0px -30px 0px' , width:'300px', height: '40px'}} size='sm' variant="outline-dark" type="submit">
              회원가입
          </Button>
          </div>
        </Col>

      </Form>
      </Card.Body>
      
      <Card.Footer className="card-footer text-center py-3" >
      <Row className="align-items-center">
          <Col sm='6'>
          <Card.Text>이미 회원이신가요?</Card.Text>
          </Col>
          <Col sm='6'>
          <NavLink to={'/signin'}>
            <Button className='mb-0' variant="outline-warning">
              로그인하기
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

export default SignUp;
