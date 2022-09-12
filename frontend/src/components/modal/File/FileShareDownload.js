import { margin, width } from '@mui/system';
import React, { useState, useRef, useEffect } from 'react';
//import Modal from 'react-modal'
import {Table,Modal,Card,Row, Col,Button,InputGroup,Form, FormSelect } from 'react-bootstrap';
import { checkResponse, fetchResponse, getLocalStorageAuthUser, projectFileListdata,fileDownload,deleteFile,addFileAndFindFileList} from '../../../apis/Fetch';
import Pagination from '../../fileshare/fileshareItem/Pagination';
import FileUpload from '../../modal/File/FileUpload'
import '../../../styles/css/modal-90w.css'
import '../../../styles/css/Board.css'
import downloadIcon from '../../../assets/icons/download.svg'
import deleteIcon from '../../../assets/icons/delete.svg'
import { useSelector, useDispatch } from 'react-redux';
import {fileDirectoryData,fileFileData} from '../../../redux/file'

function FileShareDownload({modalShow,FileDownloadModalIsOpenCallback,onClickFileUploadModal,FileUploadModalIsOpen,uploadModalIsOpen,authUserNo, posts}) {

    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;
    const [checkflagupload, setcheckflagupload] = useState(false);

    const uploadcheck = async (comment, file, projectNo,userNo)=> {
        console.log("tttt")
        const Filedata = await addFileAndFindFileList(comment, file, projectNo,userNo);
        console.log("============>",Filedata)
        const FileListdata = Filedata.data.data;
        const fileurl = Filedata.data.fileurl
        dispatch(fileFileData(FileListdata));

        return fileurl;
    }
    const dispatch = useDispatch();


    // const posts = useSelector( state => ({
    //     filedata: state.file.filedata,
    // }));
    return (
        <div>
        <img src={downloadIcon} style={{height:'33px', display:'none'}} />
        <img src={deleteIcon} style={{height:'33px', display:'none'}} />
        <Modal  
                show={modalShow}
                className={'Modal'}
                dialogClassName="modal-90w"
                style={{textAlign:'center'}}
                onHide={() => FileDownloadModalIsOpenCallback(false)}
                >
                <Modal.Header closeButton>
                    <Modal.Title>파일 다운로드 </Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                            <Form> 
                                <Table striped className='tbl-ex'>
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
                                        <th>다운로드</th>
                                        <th>삭제</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {
                                                posts.filedata!==null?
                                                    posts.filedata.slice(offset, offset + limit).map(({userNo,url,comment,originFileName,sendDate,projectNo},index) => (
                                                        <tr key={index}>
                                                            <td>{posts.filedata.length-offset-index}</td>
                                                            <td>{originFileName}</td>
                                                            <td title={comment} style={{whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis',width:'auto', maxWidth:'250px'}}>{comment}</td>
                                                            <td>{sendDate}</td>
                                                            <td>
                                                                <Button variant="" component="label" onClick={() => {
                                                                    { 
                                                                        let spliturl = url;
                                                                        spliturl=spliturl.split('/')
                                                                        return fileDownload(spliturl[2])
                                                                    }
                                                                    }}>
                                                                        <img src={downloadIcon} style={{height:'33px'}} />
                                                                </Button> 
                                                            </td>
                                                            <td>
                                                                {authUserNo==userNo?
                                                                    <Button variant="" component="label" style={{color:'red'}} onClick={async ()=>{
                                                                            // {deleteFile(url,userNo,projectNo,setPosts)}}
                                                                            const filelistdata= await deleteFile(url,userNo);
                                                                            const FileListdata = await projectFileListdata(projectNo);
                                                                            dispatch(fileFileData(FileListdata));
                                                                        }}>
                                                                        <img src={deleteIcon} style={{height:'33px'}} />
                                                                    </Button>:null
                                                                }
                                                            </td>
                                                        </tr>
                                                        
                                                    )):null

                                        }

                                    </tbody>
                                </Table>
                                {
                                    posts.filedata!==null?
                                        <Pagination
                                            total={posts.filedata.length}
                                            limit={limit}
                                            page={page}
                                            setPage={setPage}
                                        />:null
                                }
                            </Form>
                    </Modal.Body>
                <Modal.Footer>
                            <Button
                                className='form-group text-right' 
                                variant="outline-dark"  
                                onClick={() => FileDownloadModalIsOpenCallback(false)}> 닫기
                            </Button>
                            <Button component="label" variant="outline-dark" onClick={onClickFileUploadModal} //책갈피 여기도 수정해줘야함
                            > 
                                Upload  
                            </Button>
                </Modal.Footer>
        </Modal>
        <FileUpload modalShow={uploadModalIsOpen} FileUploadModalIsOpenCallback={FileUploadModalIsOpen} uploadcheck={uploadcheck}></FileUpload>
        </div>
    );
}

export default FileShareDownload;