import { height, margin } from '@mui/system';
import React, { useState, useEffect, Fragment } from 'react';
import { Button, Table, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { checkResponse, fetchResponse, getLocalStorageAuthUser, projectDirectoryListdata,projectFileListdata} from '../../../apis/Fetch';
import FileShareDownload from '../../modal/File/FileShareDownload'
import FileUpload from '../../modal/File/FileUpload'
import Pagination from './Pagination';
import '../../../styles/css/Board.css'
import { useSelector, useDispatch } from 'react-redux';
import {fileDirectoryData,fileFileData} from '../../../redux/file'


function FileShareDirectory({userNo}) {
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectProject, setselectProject] = useState(null);
    const [uploadModalIsOpen, setuploadModalIsOpen] = useState(false);
    const [isInitial, setInitial] = useState(false);

    const dispatch = useDispatch();
    const offset = (page - 1) * limit;
    
    useEffect(async () => {
        const directoryListdata = await projectDirectoryListdata(userNo)
        dispatch(fileDirectoryData(directoryListdata));
        setInitial(true)
    }, []);

    const posts = useSelector(state => ({
        directorydata: state.file.directorydata,
    }));

    const filePosts = useSelector( state => {
        return ({
        filedata: state.file.filedata,
    })
});
    
    // modal click
    const onClickModal = async (e) => {
        setModalIsOpen(true)
        const FileListdata = await projectFileListdata(e.target.id);
        dispatch(fileFileData(FileListdata));

    }
    
    const FileDownloadModalIsOpen = (isOpenStatus) => {
        setModalIsOpen(isOpenStatus)
    }

    const onClickFileUploadModal = () => {
        setuploadModalIsOpen(true)
    }
    const FileUploadModalIsOpen = (isOpenStatus) => {
        setuploadModalIsOpen(isOpenStatus)
    }

    return (
        <Fragment>
            <div style={{width:'83%', textAlign:'center', margin:'0 auto'}}>
                <Table className='tbl-ex' striped style={{width: '100%'}}>
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
                        <th>프로젝트 명</th>
                        <th>채널 명</th>
                        <th>파일 목록</th>
                    </tr>
                    </thead>
                    <tbody>
                    
                    {
                       
                        isInitial ? 
                            posts.directorydata.slice(offset, offset + limit).map(({projectNo,projectName,crewName},index) => (
                                <tr key={index}>
                                    <td>{posts.directorydata.length-offset-index}</td>
                                    <td>{projectName}</td>
                                    <td>{crewName}</td>
                                    <td> 
                                        <Button id={projectNo} variant="" component="label" onClick={onClickModal}>
                                                    보기 
                                        </Button> 
                                    </td>
                                </tr>
                            )) :
                            null
                    }
                    </tbody>
                </Table>
                {   
                    isInitial ?
                        <Pagination
                                    total={posts.directorydata.length}
                                    limit={limit}
                                    page={page}
                                    setPage={setPage}
                        /> : null
                        
                }    
            </div>
            {console.log("ssssssss",filePosts)}
            {   
                (filePosts!==null&&filePosts!==undefined&&true)?
                <FileShareDownload
                    modalShow={modalIsOpen}
                    FileDownloadModalIsOpenCallback={FileDownloadModalIsOpen} 
                    onClickFileUploadModal={onClickFileUploadModal}
                    FileUploadModalIsOpen={FileUploadModalIsOpen}
                    uploadModalIsOpen={uploadModalIsOpen}
                    authUserNo={userNo}
                    posts={filePosts}
                /> :
                null
            }    

        </Fragment>
    );
}
export default FileShareDirectory;