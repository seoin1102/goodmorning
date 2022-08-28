import React, { useState, useEffect } from 'react';
import { Button, Table, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { checkResponse, fetchResponse, getLocalStorageAuthUser } from '../../../apis/Fetch';

function FileShare(props) {
    
    const user = getLocalStorageAuthUser();
    const userNo = user.no;
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchdata(){
            const data ={
                userNo: userNo
            }
            const response =  await fetchResponse('api/fileManagement/fileshareDirectory','post','jsonjsonHeader',JSON.stringify(data));
            const json = await checkResponse(response);
            console.log(json.data);
            setPosts(json.data.data);
            }
        fetchdata();
      }, []);

      
    return (
        <Table striped>
            <thead>
            <tr>
                <th></th>
                <th>디렉토리명</th>
            </tr>
            </thead>
            <tbody>
                {posts.map(({projectName},index) => (
                    <tr key={index++}>
                        <td>{index}</td>
                        <td>{projectName}</td>
                    </tr>
                ))}
             </tbody>
        </Table>
    );
}
export default FileShare;