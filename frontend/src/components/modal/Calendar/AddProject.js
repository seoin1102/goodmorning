
import React, { useState, useEffect, memo } from "react";
import { useSelector, useDispatch, shallowEqual  } from 'react-redux';
import { Row, Col } from "react-bootstrap";

import StartDatePicker from "../../calendar/StartDatePicker";
import EndDatePicker from "../../calendar/EndDatePicker";

import "../../../styles/css/Calendar.css";
import {get, post, remove} from '../../../apis/Axios';
import moment from 'moment';
import AssignSelect from '../../calendar/AssignSelect'
import ProjectSelect from '../../calendar/ProjectSelect'
import Status from "../../calendar/Status";
import ColorPicker from '../../calendar/ColorPicker'
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { addProject } from "../../../redux/project";
import Button from 'react-bootstrap/Button';
import { Octokit } from "@octokit/core";
import { fetchResponse,checkResponse } from "../../../apis/Fetch";
import ChannelSelect from "../../calendar/ChannelSelect";

function AddProject({show, publishLinkPreview, setShow}) {
  
  const [state, setState] = useState()
  const [clickedStart, setClickedStart] = useState()
  const [clickedEnd, setClickedEnd] = useState()
  const [clickedName, setClickedName] = useState()
  const [clickedDescript, setClickedDescript] = useState()
  const [clickedStatus, setClickedStatus] = useState(0);
  const [clickedCrewNo, setClickedCrewNo] = useState();
  const [clickedCrewName, setClickedCrewName] = useState();
  const [errormessage, seterrormessage] = useState("");

  // useEffect(()=>{
    
  // },[])
  const projectList = useSelector((state) => state.project, shallowEqual);
  const crewNo = useSelector(state => state.focus.crewNo, shallowEqual);
  const channelNo = useSelector(state => (state.focus.channelNo), shallowEqual);

  const dispatch = useDispatch();
  const [gitName, setGitName] = useState();
  const [repoName, setRepoName] = useState();
  const [gitToken, setgitToken] = useState();
  const [totalProjectList, setTotalProjectList] = useState()

  const ids = []
  projectList.map((event) => {ids.push(event.id)})
  const maxId = Math.max(...ids);

  const totalProject = React.useCallback(
    async (channelNo) => {
      const getProjects = await get(`/project/${channelNo}`);
      setTotalProjectList(getProjects);
    },
    [dispatch]
  );



  const makeJenkinsJob = async function(projectName,gitUserName) {
    try {
              const data ={
                  projectName: projectName,
                  gitUserName: gitUserName
              }
            const response = await fetchResponse('/api/project/makejenkinsJob','post','jsonjsonHeader',JSON.stringify(data));
            const json = await checkResponse(response);
        } catch(err) {
          console.log(err)
        }
      }

  const handleClose = () => {
    setShow(false)
    setClickedStart(Date.now())
    setClickedEnd(Date.now())
    setClickedName('')
    setClickedDescript('')
    setClickedStatus(0)
    setGitName('')
    setgitToken('')
    seterrormessage('')
    setClickedCrewName('')
    setClickedCrewNo('')

  }

  const onSubmit = async (e) => {

    try{
      e.preventDefault();
      const updatedTask={
        projectName: clickedName,
        start:moment(clickedStart).format('YYYY-MM-DD'),
        end: moment(clickedEnd).format('YYYY-MM-DD'),
        description: clickedDescript,
        status: clickedStatus,
        crewNo: clickedCrewNo,
        crewName: clickedCrewName,
        id: maxId+1
      }

      const result1 = await post(`/project`,  updatedTask)
      // if(reust1.data !== 'success') 
      //   return;
      console.log("=====>", result1);
      console.log("=====>",updatedTask)
      dispatch(addProject([updatedTask]));

      const octokit = new Octokit({
        auth: gitToken
      })
      const giturl='';

      await octokit.request(`POST /user/repos`, {
        name: clickedName,
        private : false
      })

      await octokit.request(`POST /repos/${gitName}/${clickedName}/hooks`, {
        owner: gitName,
        repo: clickedName,
        name: 'web',
        active: true,
        events: [
          'push',
          'pull_request',
          'create',
          'delete',
        ],
        config: {
          url: 'http://34.64.235.225:8080/api/githubhook/hookdata',
          content_type: 'json',
          insecure_ssl: '0'
        }
      })

      await makeJenkinsJob(clickedName,gitName);

      handleClose();
      setClickedStart(Date.now())
      setClickedEnd(Date.now())
      setClickedName('')
      setClickedDescript('')
      setClickedStatus(0)
      seterrormessage('')
      setClickedCrewName('')
      setClickedCrewNo('')

      publishLinkPreview(gitName, repoName);
    } catch(err){
      seterrormessage("깃 또는 깃토큰이 일치하지 않습니다!");
    }
  }


const nameHandler = (e) =>{
  setClickedName(e.target.value.replace(/[^A-Za-z0-9 ]/ig, ''))
  setRepoName(e.target.value)
  if(totalProjectList.find(project=> project.projectName == e.target.value)){
    seterrormessage("같은 이름의 프로젝트가 있습니다. 다른 프로젝트 명을 입력해주세요.")
  }else{
    seterrormessage('')
  }
}


const descriptHandler =(e)=>{
  setClickedDescript(e.target.value)
}

const [copySuccess, setCopySuccess] = useState(null);
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
                placeholder="프로젝트 이름을 입력해주세요. 영어만 입력 가능합니다."
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
            {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>리포지토리 명</Form.Label>
              <Form.Control
                type="text"
                placeholder="리포지토리 명을 입력해주세요."
                autoFocus
                value={repoName || ''} onChange={(e)=> {setRepoName(e.target.value)}}
              /> 
            </Form.Group> */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>깃 토큰</Form.Label>
              <Form.Control
                type="text"
                placeholder="깃 토큰을 입력해주세요."
                autoFocus
                value={gitToken || ''} onChange={(e)=> {setgitToken(e.target.value)}}
              /> 
            </Form.Group>
            <h6>프로젝트명</h6>
            <ChannelSelect clickedCrewNo={clickedCrewNo} setClickedCrewNo={setClickedCrewNo} clickedCrewName={clickedCrewName} setClickedCrewName={setClickedCrewName}  />
    
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
              </Form.Group>
              <div className='text-center'>
                {
                  errormessage===''?
                  <><br/></>:
                  <p style={{color:'red'}}>
                    <br/>{errormessage}
                  </p>
                }
              </div>
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
