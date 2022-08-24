import React, { useState, useRef } from 'react';
import Modal from 'react-modal'
import {Card,Row, Col,Button,InputGroup,Form } from 'react-bootstrap';

function FileUpload({modalShow,callback,FileUploadModalIsOpenCallback}) {

    const refForm = useRef(null);

    const handleSubmit = function (e) {
        e.preventDefault();

        // Validation
        if (e.target['comment'].value === '') {
            console.error(`validation ${e.target['comment'].placeholder} is empty ''`);
            return;
        }

        if (e.target['uploadFile'].files.length === 0) {
            console.error(`validation ${e.target['uploadFile'].placeholder} is empty`);
            return;
        }

        const comment = e.target['comment'].value;
        const file = e.target['uploadFile'].files[0];

        callback(comment, file);
        FileUploadModalIsOpenCallback(false);
    }

    return (
        <Modal  
                isOpen={modalShow}
                className={'Modal'}
                onRequestClose={() => FileUploadModalIsOpenCallback(false)}
                shouldCloseOnOverlayClick={true}
                style={{content: {width: '30%', height: '50%'}}}
                >
                        <Col xs="auto" className="my-5">
                            <Card.Text className="card-title text-uppercase text-center py-3">
                                파일 업로드 
                            </Card.Text>
                            <Form 
                                onSubmit={handleSubmit}
                                ref={refForm}>

                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">파일 설명</InputGroup.Text>
                                    <Form.Control
                                        placeholder={'설명(코멘트)'}
                                        type={'text'}
                                        name={'comment'}
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                    />
                                </InputGroup>
                                {/* <input
                                    type={'text'}
                                    name={'comment'}
                                    placeholder={'설명(코멘트)'}/> */}

                                {/* <label>파일</label> */}
                                <br/>
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>파일</Form.Label>
                                    <Form.Control 
                                    type={'file'}
                                    name={'uploadFile'}
                                    placeholder={'파일'}/>
                                </Form.Group>
                                {/* <input
                                    type={'file'}
                                    name={'uploadImage'}
                                    placeholder={'파일'}/> */}
                            </Form>
                        </Col>
                <div>
                    <Row className="align-items-center">
                        <Col sm='6'>
                            <Button
                                className='form-group text-right' 
                                variant="outline-dark" 
                                onClick={() => {
                                refForm.current.dispatchEvent(new Event("submit", {cancelable: true, bubbles: true}));
                            }}>
                                확인
                            </Button>
                        </Col>
                        <Col sm='6'>
                            <Button
                                className='form-group text-right' 
                                variant="outline-dark"  
                                onClick={() => FileUploadModalIsOpenCallback(false)}>취소
                            </Button>
                        </Col>
                    </Row>

                </div>
        </Modal>
    );
}

export default FileUpload;