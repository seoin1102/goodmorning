import { margin, width } from '@mui/system';
import React, { useState, useRef, useEffect } from 'react';
//import Modal from 'react-modal'
import {Table,Modal,Card,Row, Col,Button,InputGroup,Form, FormSelect } from 'react-bootstrap';
import { checkResponse, fetchResponse, getLocalStorageAuthUser, projectFileListdata,fileDownload } from '../../../apis/Fetch';
import Pagination from '../../fileshare/fileshareItem/Pagination';
import FileUpload from '../../modal/File/FileUpload'
import '../../../styles/css/modal-90w.css'
function FileShareDownload({modalShow,FileDownloadModalIsOpenCallback,posts,onClickFileUploadModal,FileUploadModalIsOpen,uploadModalIsOpen,userNo}) {

    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    return (

        <div>
        <Modal  
                show={modalShow}
                className={'Modal'}
                dialogClassName="modal-90w"
                style={{textAlign:'center'}}
                >
                <Modal.Header>
                    <Modal.Title>파일 다운로드 </Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                            <Form> 
                                <Table striped>
                                    <thead>
                                    <tr>
                                        <th>
                                            <select
                                                type="number"
                                                value={limit}
                                                onChange={({ target: { value } }) => setLimit(Number(value))}>
                                                    <option value="5">5</option>
                                                    <option value="10">10</option>
                                                    <option value="20">20</option>
                                                    <option value="50">50</option>
                                                    <option value="100">100</option>
                                            </select> 
                                        </th>
                                        <th>파일명</th>
                                        <th>코멘트</th>
                                        <th>업로드일</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {posts.slice(offset, offset + limit).map(({postsUserNo,url,comment,originFileName,sendDate},index) => (
                                        <tr key={index}>
                                            <td>{posts.length-offset-index}</td>
                                            <td>{originFileName}</td>
                                            <td title={comment} style={{whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis',width:'auto', maxWidth:'250px'}}>{comment}</td>
                                            <td>{sendDate}</td>
                                            <td>
                                                <Button variant="" component="label" onClick={() => {
                                                    { 
                                                        let spliturl = url;
                                                        spliturl=spliturl.split('/')
                                                        return fileDownload(spliturl[3])
                                                    }
                                                    }}>
                                                        다운로드  
                                                </Button> 
                                            </td>
                                            <td>
                                                <Button variant="" component="label" style={{color:'red'}}>
                                                    삭제
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                                <Pagination
                                    total={posts.length}
                                    limit={limit}
                                    page={page}
                                    setPage={setPage}
                                />
                            </Form>
                    </Modal.Body>
                <Modal.Footer>
                            <Button
                                className='form-group text-right' 
                                variant="outline-dark"  
                                onClick={() => FileDownloadModalIsOpenCallback(false)}> 닫기
                            </Button>
                            <Button component="label" variant="outline-dark" onClick={onClickFileUploadModal}>
                                Upload  
                            </Button>
                </Modal.Footer>
        </Modal>
        <FileUpload modalShow={uploadModalIsOpen} FileUploadModalIsOpenCallback={FileUploadModalIsOpen} ></FileUpload>
        </div>
    );
}

export default FileShareDownload;