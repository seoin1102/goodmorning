import React from 'react'; 
import '../../../assets/css/pace.min.css'
import '../../../assets/css/bootstrap.css'
import '../../../assets/css/bootstrap.min.css'
import '../../../assets/css/animate.css'
import '../../../assets/css/icons.css'
import '../../../assets/css/app-style.css'
import {NavLink} from "react-router-dom";

import { Button, Form, Row, Col, Card, Dropdown, DropdownButton, InputGroup} from 'react-bootstrap';



function ResetPw({callback}) {
  return (
    <div className="SignIn">
     <div className="card-title text-uppercase text-center py-3"></div>
     <Card className='card card-authentication1 mx-auto my-5'>
    <Card.Body>
        <Form onSubmit={e => {
                  e.preventDefault();
                  callback(e.target.email.value);
                }}>
            <Col xs="auto" className="my-5">
              <Card.Text className="card-title text-uppercase pb-2">
                RESET PASSWORD
              </Card.Text>
                
                <Form.Group  className="form-group">
                    <Form.Label htmlFor="inlineFormInputGroup">회원가입 시 작성했던 이메일을 입력해주세요. 이메일로 임시비밀번호를 보내드립니다.</Form.Label>
                    <div className="position-relative has-icon-right">
                      <Form.Label htmlFor="inlineFormInputGroup">Email address</Form.Label>
                      <InputGroup className="mb-2">
                        <Form.Control className='form-control input-shadow' type="email" id="email" placeholder="이메일을 입력해주세요" required/>
                        <InputGroup.Text><i className="icon-envelope-open"></i></InputGroup.Text>
                      </InputGroup>
                    </div>
                  </Form.Group>

                <Button className="btn btn-light btn-block" type="submit">
                  비밀번호 수정
                </Button>
            </Col>

        </Form>
    </Card.Body>
    
    <Card.Footer className="card-footer text-center py-3" >
    <NavLink to={'/signin'}>
        <Button className='text-warning mb-0' variant="link">
        로그인 페이지로 돌아가기
        </Button>
    </NavLink>
      </Card.Footer>
    </Card>
    </div>
  );
}

export default ResetPw;
