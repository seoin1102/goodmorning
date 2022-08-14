import React,{Fragment} from 'react';
import { Button, Form, Row, Col, CloseButton, Card } from 'react-bootstrap';

function CrewSetting({onClickModal}) {


    return (
      <>
      <div className="card-title text-uppercase text-center py-3"></div>
      <Card className='card' >
      <Card.Text className="card-title text-uppercase text-center py-3">
      </Card.Text>
     
       <Row >
       <Col sm='1'>
       </Col>


        
        <Card.Text > 크루 이름</Card.Text>
         <div className="position-relative has-icon-right mb-2">
         <input style={{width:'500px',height:'35px'}} placeholder=""></input>
         </div>

         <Card.Text>초대 권한 설정</Card.Text>
         <Card.Text><Button>초대 권한 설정</Button></Card.Text>

         <Card.Text>강퇴 권한 설정</Card.Text>
         <Card.Text><Button>강퇴 권한 설정</Button></Card.Text>


     </Row>
     
     <Card.Footer className="card-footer text-center py-3" >
     
     <Row >
     <Col sm='6'>
  
      </Col>
      <Col sm='3'>
     <Button className="btn btn-light btn-block waves-effect waves-light"
     onClick={onClickModal}
      type="submit">
      취소      
      </Button>
      </Col>
      <Col sm='3'>
     <Button className="btn btn-block waves-effect waves-light"  type="submit">
      변경 사항 저장      
      </Button>
      </Col>
       </Row>
       </Card.Footer>
     </Card>
 
     
     </>
    );
}

export default CrewSetting;