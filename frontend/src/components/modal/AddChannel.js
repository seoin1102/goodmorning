import React from 'react';
import { Button, Row, Col, Card,} from 'react-bootstrap';

function AddChannel({onClickModal}) {


    return (
      <>            
      <div className="card-title text-uppercase text-center py-3"></div>
      <Card className='card' >
       
      <Card.Text className="card-title text-uppercase text-center py-3">
      </Card.Text>

     
       <Row >
       <Col sm='1'>
       </Col>

        <Card.Text>1. 회사 이름이 어떻게 됩니까?채널 이름</Card.Text>
         <div className="position-relative has-icon-right mb-2">
         <input style={{width:'500px',height:'35px'}} placeholder="예:더존 비즈온"></input>
         </div>


         <Card.Text>2. 팀 이름이 어떻게 됩니까?</Card.Text>
         <div className="position-relative has-icon-right">
         <input style={{width:'500px',height:'35px'}}></input>
         </div>

         <Card.Text>3. 고객님이 팀에서 가장 이메일을 자주 보내는 대상은 누구인가요?</Card.Text>
         <div className="position-relative has-icon-right">
         <input style={{width:'500px',height:'35px'}}></input>
         </div>

         <Card.Text>초대 권한 설정</Card.Text>
         <Card.Text><Button>초대 권한 설정</Button></Card.Text>



     </Row>
     <Card.Footer className="card-footer text-center py-3" >
     
     <Row >
     <Col sm='6'>
  
      </Col>
      <Col sm='3'>
     <Button 
        className="btn btn-light btn-block waves-effect waves-light"
        onClick={onClickModal}
        type="submit">
      취소
      </Button>
      </Col>
      <Col sm='3'>
     <Button className="btn btn-block waves-effect waves-light"  type="submit">
      새 채널 생성
      </Button>
      </Col>
       </Row>
       </Card.Footer>
     </Card>
 
     {/* </Modal> */}
     </>
    );
}

export default AddChannel;