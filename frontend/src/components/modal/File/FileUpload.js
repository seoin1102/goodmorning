import React, { useState, useRef, useEffect } from 'react';
//import Modal from 'react-modal'
import {Modal,Card,Row, Col,Button,InputGroup,Form, FormSelect } from 'react-bootstrap';
import { addFile,checkResponse, fetchResponse, getLocalStorageAuthUser, projectDirectoryListdata, projectFileListdata} from '../../../apis/Fetch';
import { useSelector, useDispatch } from 'react-redux';
import {fileFileData,fileFileUpload} from '../../../redux/file'

function FileUpload({modalShow,FileUploadModalIsOpenCallback,uploadcheck}) {

    const refForm = useRef(null);
    const dispatch = useDispatch();
    
    const handleSubmit = async function (e) {
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
        const projectNo = e.target['selectProject'].value;
        
        addFile(comment, file, projectNo,userNo);

        uploadcheck(projectNo);


        FileUploadModalIsOpenCallback(false);
    }


    const user = getLocalStorageAuthUser();
    const userNo = user.no;
    const [posts, setPosts] = useState([]);

    useEffect(async() => {
        const projectdatalist = await projectDirectoryListdata(userNo);
        setPosts(projectdatalist);
      }, []
    );


    return (
        <Modal  
                show={modalShow}
                className={'Modal'}
                >
                <Modal.Header>
                    <Modal.Title>파일 업로드</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
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
                                        required
                                    />
                                </InputGroup>
                                <br/>
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Control 
                                        type={'file'}
                                        name={'uploadFile'}
                                        placeholder={'파일'}
                                        required
                                    />
                                </Form.Group>
                                <FormSelect name={'selectProject'} >
                                    {posts.map(({projectNo,projectName},index) => (
                                        <option key={index} value={projectNo}>{projectName}</option>
                                    ))}
                                </FormSelect>
                            </Form>
                    </Modal.Body>
                <Modal.Footer>
                            <Button
                                className='form-group text-right' 
                                variant="outline-dark"  
                                onClick={() => FileUploadModalIsOpenCallback(false)}>취소
                            </Button>
                            <Button
                                className='form-group text-right' 
                                variant="outline-dark" 
                                onClick={() => {
                                refForm.current.dispatchEvent(new Event("submit", {cancelable: true, bubbles: true}));
                            }}>
                                확인
                            </Button>
                </Modal.Footer>
        </Modal>
    );
}

export default FileUpload;