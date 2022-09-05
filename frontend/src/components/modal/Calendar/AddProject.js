
import React, { memo, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import EndDatePicker from "../../calendar/EndDatePicker";
import StartDatePicker from "../../calendar/StartDatePicker";
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { post } from '../../../apis/Axios';
import { addProject } from "../../../redux/project";
import "../../../styles/css/Calendar.css";
import { Octokit } from "@octokit/core";

function AddProject({show, handleClose, publishLinkPreview}) {
  
  const [clickedStart, setClickedStart] = useState()
  const [clickedEnd, setClickedEnd] = useState()
  const [clickedName, setClickedName] = useState()
  const [clickedDescript, setClickedDescript] = useState()
  const [clickedStatus, setClickedStatus] = useState(0);
  const [copySuccess, setCopySuccess] = useState(null);
  const [gitName, setGitName] = useState();
  const [repoName, setRepoName] = useState();

  const projectList = useSelector((state) => state.project, shallowEqual);
  const crewNo = useSelector(state => state.focus.crewNo, shallowEqual);

  const dispatch = useDispatch();

  const ids = []

  projectList.map((event) => {ids.push(event.id)})

  const maxId = Math.max(...ids);
  const onSubmit = async (e) => {
    e.preventDefault();
    // 폼 데이터 객체로 만들기
    const updatedTask={
      projectName: clickedName,
      start:moment(clickedStart).format('YYYY-MM-DD'),
      end: moment(clickedEnd).format('YYYY-MM-DD'),
      description: clickedDescript,
      status: clickedStatus,
      crewNo: crewNo,
      id: maxId+1
    }


    // const octokit = new Octokit({
    //   auth: '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'
    // })

    // await octokit.request('POST /repos/tlckd/react-practices/hooks', {
    //   owner: 'tlckd',
    //   repo: 'react-practices',
    //   name: 'web',
    //   active: true,
    //   events: [
    //     'push',
    //     'pull_request',
    //     'create',
    //     'delete',

    //   ],
    //   config: {
    //     url: 'https://2698-1-252-13-218.jp.ngrok.io/api/githubhook/hookdata',
    //     content_type: 'json',
    //     insecure_ssl: '0'
    //   }
    // })

    post(`/project`,  updatedTask)
    dispatch(addProject([ updatedTask]));

    // 폼 비우기
    handleClose();
    setClickedStart(Date.now())
    setClickedEnd(Date.now())
    setClickedName('')
    setClickedDescript('')
    setClickedStatus(0)

    publishLinkPreview(gitName, repoName);
  }

const nameHandler = (e) =>{
  setClickedName(e.target.value)
}

const descriptHandler =(e)=>{
  setClickedDescript(e.target.value)
}

const copyToClipBoard = async copyMe => {
    try {
      await navigator.clipboard.writeText(copyMe);
      setCopySuccess('Copied!');
    } 
    catch (err) {
        setCopySuccess('Failed to copy!');
    }
};


  return (
    <>
      <Modal show={show} onHide={handleClose} sx={{width:'140%'}}>
        <Modal.Header closeButton>
          <Modal.Title>프로젝트 추가</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>프로젝트명</Form.Label>
              <Form.Control
                type="text"
                placeholder="프로젝트 이름을 입력해주세요."
                autoFocus
                value={clickedName || ''} onChange={nameHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>깃 계정</Form.Label>
              <Form.Control
                type="text"
                placeholder="깃계정 명을 입력해주세요."
                autoFocus
                value={gitName || ''} onChange={(e)=>{setGitName(e.target.value)}}
              /> 
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>리포지토리 명</Form.Label>
              <Form.Control
                type="text"
                placeholder="리포지토리 명을 입력해주세요."
                autoFocus
                value={repoName || ''} onChange={(e)=> {setRepoName(e.target.value)}}
              /> 
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>시작일시</Form.Label>
              <br />
              <StartDatePicker clickedStart={clickedStart} setClickedStart={setClickedStart} disableClock={true} locale="ko-KO" />
              <br />
              
              <Form.Label>종료일시</Form.Label>
              <br />
              <EndDatePicker clickedEnd={clickedEnd} setClickedEnd={setClickedEnd} disableClock={true} locale="ko-KO" />
              <br />
            
              <Form.Label>Git 훅 URL</Form.Label>
              <div style={{display:'flex', justifyContent:"space-between"}}>
              <Form.Control as="textarea" rows={2} onChange={descriptHandler} value={"http://34.64.45.3/api/githubhook/hookdata/"} disabled>
                  
              </Form.Control>
              
              

              <Button onClick={(e) => copyToClipBoard("http://34.64.45.3/api/githubhook/hookdata/")} >copy</Button>
                          </div><br />     <br /> 

              <Form.Label>젠킨스 훅 URL</Form.Label>
              <br />
              <div style={{display:'flex', justifyContent:"space-between"}}>
              <Form.Control as="textarea" rows={2} onChange={descriptHandler} value={"http://34.64.45.3/api/jenkinsHook/hookdata"} disabled/>
                <Button onClick={(e) => copyToClipBoard("http://34.64.45.3/api/jenkinsHook/hookdata")} > 
                  copy
                </Button> 

              </div> 
              </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default memo(AddProject);
