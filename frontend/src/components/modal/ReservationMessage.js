import React,{Fragment} from 'react';
import { useState } from 'react';
import { Button,ButtonGroup, Form, Row, Col, CloseButton, Card, DropdownButton, Dropdown } from 'react-bootstrap';
import DropdownContext from 'react-bootstrap/esm/DropdownContext';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import Typography from '@mui/material/Typography';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


function ReservationMessage({onClickModal}) {
const [startDate, setSartDate] = React.useState(0);

    return (
      <>
      <div className="card-title text-uppercase text-center py-3"></div>
      <Card className='card' >
      <Card.Text className="card-title text-uppercase text-center py-3">
      </Card.Text>
    


       <Form.Group className="form-group" controlId="exampleInputUsername">
       <Row>
        <Col sm='6'>
        <Card.Text > 크루 이름</Card.Text>

        <input style={{width:'100px',height:'35px'}}></input>

        </Col>
        <Col sm='6'>
        <Card.Text > 크루 이름</Card.Text>
        {/* <Typography component="legend"> 시작일 </Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}/>
                    <DatePicker
                        label="start-date"
                        value={startDate}
                        onChange={(startDate) => {
                        setSartDate(startDate);}}
                        renderInput={(params) => <TextField {...params} />}
         /> */}
        <input style={{width:'100px',height:'35px'}}></input>
         </Col>
         </Row>
       </Form.Group>


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

export default ReservationMessage;