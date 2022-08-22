import React,{useState} from 'react'; 
import {NavLink} from "react-router-dom";
import { Button, Form, Row, Col, Card, Dropdown, DropdownButton, InputGroup} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelopeOpen, faUser, faCheckCircle, faTimesCircle} from '@fortawesome/free-solid-svg-icons'

function SignUp({callback, email}) {
  const [checkemail, setcheckEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const onChangeEmailInput = e => {
    setcheckEmail(e.target.value);
    // check email format(account@mysite.com)
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
    setValidEmail(re.test(e.target.value))
 }

  return (


    <div className="SignUp">
       <div style={{padding:'0 700px'}}>
    
        <Card bg='light' className='card card-authentication1 mx-auto my-4'>
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
            <Form.Control className='form-control input-shadow' id="email" type="email" value={checkemail}  placeholder="이메일을 입력해주세요" onChange={onChangeEmailInput} required />
              { checkemail === '' ?
                  null :
                  validEmail ?
                      <FontAwesomeIcon icon={faCheckCircle} style={{marginLeft:5,marginRight:5 , fontSize:35, color:'blue'}}/>: 
                      <FontAwesomeIcon icon={faTimesCircle} style={{marginLeft:5,marginRight:5, fontSize:35, color:'red'}}/>
              }
              <InputGroup.Text><FontAwesomeIcon icon={faEnvelopeOpen}></FontAwesomeIcon></InputGroup.Text>
            </InputGroup>

          <Form.Label htmlFor="inlineFormInputGroup">Name</Form.Label>
          <InputGroup className="mb-2">
          <Form.Control className='form-control input-shadow' id="name" type="name"  placeholder="이름을 입력해주세요" required/>
            <InputGroup.Text><FontAwesomeIcon icon={faUser}></FontAwesomeIcon></InputGroup.Text>
          </InputGroup>  
          
          </div>
        </Form.Group>

      
            <Form.Label htmlFor="inlineFormInputGroup" >
              Password
            </Form.Label>
            <InputGroup className="mb-2">
            <Form.Control type="password" id="passwd" className="form-control input-shadow"  placeholder="비밀번호를 입력해주세요" required/>
              <InputGroup.Text><FontAwesomeIcon icon={faLock}></FontAwesomeIcon></InputGroup.Text>
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
            <Button className='mb-0' variant="outline-dark">
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
