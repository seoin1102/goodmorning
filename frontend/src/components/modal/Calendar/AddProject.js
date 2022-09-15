
import React, { memo, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import EndDatePicker from "../../calendar/EndDatePicker";
import StartDatePicker from "../../calendar/StartDatePicker";

import { Octokit } from "@octokit/core";
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { get, post } from '../../../apis/Axios';
import { checkResponse, fetchResponse } from "../../../apis/Fetch";
import { addProject } from "../../../redux/project";
import "../../../styles/css/Calendar.css";
import ChannelSelect from "../../calendar/ChannelSelect";
import ProjectAssign from "../../calendar/ProjectAssign";

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
  const [clickedAssign , setClickedAssign] = useState();
  const projectList = useSelector((state) => state.project, shallowEqual);
  const crewNo = useSelector(state => state.focus.crewNo, shallowEqual);
  const channelNo = useSelector(state => (state.focus.channelNo), shallowEqual);

  const dispatch = useDispatch();
  const [gitName, setGitName] = useState();
  const [repoName, setRepoName] = useState();
  const [gitToken, setgitToken] = useState();

  const ids = []
  projectList.map((event) => {ids.push(event.id)})
  const maxId = Math.max(...ids);

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
      let typeError="notempty";

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
          id: maxId+1,
          assign: clickedAssign
        }

        if(clickedAssign == undefined||clickedName == undefined || gitName == undefined || gitToken == undefined || clickedCrewName == undefined || clickedStart == undefined || clickedEnd == undefined ){
          typeError="empty"
          throw new Error(); 
        }

        const result1 = await post(`/project`,  updatedTask)
        clickedAssign.map((assign)=>{
          const _addTask ={
            title: assign.userName+'님의 '+clickedName+' 작업',
            start:moment(clickedStart).format('YYYY-MM-DD'),
            end: moment(clickedStart).format('YYYY-MM-DD'),
            projectName:clickedName,
            projectNo: maxId+1,
            crewNo: clickedCrewNo,
            color: '#00bcd4',
            status: "Todo",
            userName:assign.userName,
            userNo: assign.userNo
            }
          
            post(`/task`, _addTask)
            console.log(_addTask)
        })

        console.log("=====>", result1);
        console.log("=====>",updatedTask)
        dispatch(addProject([updatedTask]));

        const octokit = new Octokit({
          auth: gitToken
        })

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
        typeError=='empty'?
        seterrormessage("모든 칸을 다 입력하세요")
        : seterrormessage("깃 또는 깃토큰이 일치하지 않습니다!");

      }
    }


    const nameHandler = async(e) =>{
        setClickedName(e.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/ig, ''))
        setRepoName(e.target.value)
        const getProjects = await get(`/project/${channelNo}`);
        if(getProjects.find(project=> project.projectName == e.target.value)){
            seterrormessage("같은 이름의 프로젝트가 있습니다. 다른 프로젝트 명을 입력해주세요.")
        }else{
            seterrormessage('')
        }
    }

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
              <Form.Label>깃 토큰</Form.Label>
              <Form.Control
                type="text"
                placeholder="깃 토큰을 입력해주세요."
                autoFocus
                value={gitToken || ''} onChange={(e)=> {setgitToken(e.target.value)}}
              /> 
            </Form.Group>
            <h6>채널명</h6>
            <ChannelSelect clickedCrewNo={clickedCrewNo} setClickedCrewNo={setClickedCrewNo} clickedCrewName={clickedCrewName} setClickedCrewName={setClickedCrewName}  />
    
            <h6>프로젝트 참여자</h6>
            <ProjectAssign clickedAssign={clickedAssign} setClickedAssign={setClickedAssign} />
    
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
