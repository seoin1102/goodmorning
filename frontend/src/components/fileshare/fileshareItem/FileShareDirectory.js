import { height } from '@mui/system';
import React, { useState, useEffect, Fragment } from 'react';
import { Button, Table, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { checkResponse, fetchResponse, getLocalStorageAuthUser, projectDirectoryListdata,projectFileListdata} from '../../../apis/Fetch';
import FileShareDownload from '../../modal/File/FileShareDownload'
import FileUpload from '../../modal/File/FileUpload'
import Pagination from './Pagination';

function FileShareDirectory({userNo}) {
    
    const [posts, setPosts] = useState([]);
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    const [filePosts, setfilePosts] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectProject, setselectProject] =useState();
    const [uploadModalIsOpen, setuploadModalIsOpen] = useState(false);

    useEffect(() => {
        projectDirectoryListdata(userNo,setPosts);
      }, []
    );

    // modal click
    const onClickModal = (e) => {
        setModalIsOpen(true)
        setselectProject(e.target.id);
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
    
    useEffect(() => {
        projectFileListdata(selectProject,setfilePosts);
      }, [selectProject,uploadModalIsOpen]
    );

    return (
        <Fragment>
            <div style={{width:'83%', textAlign:'center'}}>
                <Table striped style={{width: '100%'}}>
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
                    </tr>
                    </thead>
                    <tbody>
                        {posts.slice(offset, offset + limit).map(({projectNo,projectName},index) => (
                            <tr key={index}>
                                <td>{posts.length-offset-index}</td>
                                <td onClick={onClickModal} id={projectNo}>{projectName}</td>
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
            </div>
            <FileShareDownload modalShow={modalIsOpen} FileDownloadModalIsOpenCallback={FileDownloadModalIsOpen} 
                posts={filePosts} 
                onClickFileUploadModal={onClickFileUploadModal}
                FileUploadModalIsOpen={FileUploadModalIsOpen}
                uploadModalIsOpen={uploadModalIsOpen}
                authUserNo={userNo}
            />
        </Fragment>

    );
}
export default FileShareDirectory;