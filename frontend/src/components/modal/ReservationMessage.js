import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
function ReservationMessage({modalShow, onClickModal}) {
  const [value, setValue] = useState(new Date());

    function onClickCheck() {

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