import { TextField } from '@mui/material';
import React, {useState} from 'react';
import { Modal, Form, Button, Row, Col   } from 'react-bootstrap';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
function ReservationMessage({modalShow, onClickModal}) {
  const [value, setValue] = useState(new Date());

    function onClickCheck() {
      console.log(value);
    }
    return (
      <>
      <Modal show={modalShow} onHide={onClickModal}>
          <Modal.Header closeButton>
              <Modal.Title>메시지 예약</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
              <Form>
               <TextField
                      id="datetime-local"
                      label="날짜 및 시간 선택"
                      type="datetime-local"
                      defaultValue=""
                      onChange={(newValue) => {
                        setValue(newValue.target.value);
                      }}
                      sx={{ width: 250 }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    /> 
                 </Form>
                 
          </Modal.Body>
          <Modal.Footer>
              <Button variant="outline-dark"  onClick={onClickModal} >
                취소
              </Button>
              <Button variant="outline-dark"  >
                메시지 예약
              </Button>
              <Button variant="outline-dark"  onClick={onClickCheck} >
                값 확인
              </Button>
          </Modal.Footer>
      </Modal>
      </>
    );
}

export default ReservationMessage;