import { Autocomplete, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setCHANNELFOCUS } from '../../../redux/focus';


function ChannelSetting_info({onChangeHandler, channelName, onClickModal}) {
  const emaillist = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },

  ];

    return (
    <>
        <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="crewForm.name">
                  <Form.Label>채널 이름</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Crew Name"
                    onChange={onChangeHandler}
                    defaultValue={channelName}
                    autoFocus
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="crewForm.description"
                >
                  <Form.Label>채널 주제</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder={"Crew Description"}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="crewForm.name">
                      <Form.Label>초대</Form.Label>
                      <Autocomplete
                        multiple
                        limitTags={2}
                        id="multiple-limit-tags"
                        options={emaillist}
                        getOptionLabel={(option) => option.title}
                        // defaultValue={[emaillist[13], emaillist[12], emaillist[11]]}
                        renderInput={(params) => (
                          <TextField {...params} label="email" placeholder="example@gmail.com" />
                        )}
                        sx={{ width: '450px' }}
                      />
                </Form.Group>
                <Form.Group className="mb-3" controlId="crewForm.name">
                <Button variant="outline-dark" onClick={onClickModal} >
                        전송
                      </Button>
                      </Form.Group>
                  <Form.Group className="mb-3">
                <Button variant="outline-dark" onClick={onClickModal} >
                    이 채널에서 나가기
                  </Button>
                  </Form.Group>
            </Form>
        </Modal.Body>
        {/* <Modal.Footer>
            <Button variant="outline-dark" onClick={onClickModal} >
              취소
            </Button>
            <Button variant="outline-dark" onClick={onChangeValue} >
              변경사항 저장
            </Button>
        </Modal.Footer> */}
        
    </>
    );
}

export default ChannelSetting_info;