
import React, { useState, useEffect, memo } from "react";
import { useSelector, useDispatch, shallowEqual  } from 'react-redux';
import { Row, Col } from "react-bootstrap";

import Modal from "react-modal";
import StartDatePicker from "../../calendar/StartDatePicker";
import EndDatePicker from "../../calendar/EndDatePicker";

import "../../../styles/css/Calendar.css";
import { addTask, deleteTask, updateTask } from '../../../redux/task';
import {put, post, remove} from '../../../apis/Axios';
import moment from 'moment';
import AssignSelect from '../../calendar/AssignSelect'
import ProjectSelect from '../../calendar/ProjectSelect'
import Status from "../../calendar/Status";
import ColorPicker from '../../calendar/ColorPicker'
import {FormControl, Button} from 'react-bootstrap'
function AddTask(props) {
  const { title, start, end, id, userName, userNo, projectName, projectNo, color, status } = props.state
  const [clickedEventTitle, setClickedEventTitle] = useState()
  const [clickedStart, setClickedStart] = useState()
  const [clickedEnd, setClickedEnd] = useState()
  const [clickedEventUserNo,setClickedEvenUserNo] = useState()
  const [clickedProject, setClickedProject] = useState();
  const [clickedProjectNo, setClickedProjectNo] = useState();
  const [clickedColor, setClickedColor] = useState();
  const [clickedStatus, setClickedStatus] = useState();

  const [addedAssigns, setAddedAssigns]= useState([]);
  const [includesCheck, setIncludeCheck] = useState(true);


  
  useEffect(()=>{
    setClickedEventTitle(title)
    setClickedStart(start)
    setClickedEnd(end)
    setClickedEvenUserNo(userNo)
    setClickedProject(projectName)
    setClickedProjectNo(projectNo)
    setClickedColor(color)
    setClickedStatus(status)
  },[props])

  const dispatch = useDispatch();
  const taskList = useSelector(state => state.task, shallowEqual);
  let newCalendarEvents = [...taskList];

  
    const onSubmit = (e) => {
    e.preventDefault(); // Submit 이벤트 발생했을 때 새로고침 방지

    const clickedEventId = props.state.id
    const updatedTask={
      title: clickedEventTitle,
      start:moment(clickedStart).format('YYYY-MM-DD'),
      end: moment(clickedEnd).format('YYYY-MM-DD'),
      projectName:clickedProject,
      projectNo: clickedProjectNo,
      crewNo: props.crewNo,
      color: clickedColor,
      status: clickedStatus,
      id: clickedEventId}
    

    if(clickedEventId){
      const clickedEventIdx = newCalendarEvents.findIndex(
        (event) => event.id == clickedEventId);
      if(addedAssigns){ // 추가된 사람이 있다.
        addedAssigns.map((assign)=>{
          const ids = []
          newCalendarEvents.map((event) => {ids.push(event.id)})
          const maxId = Math.max(...ids);
          const _addTask={...updatedTask, id: maxId + 1, userNo: assign, userName:userName}
          

          post(`/task`, _addTask)
          dispatch(addTask([_addTask])                   );
          props.setFilteredTask([...props.filteredTask,_addTask])
          props.closeModal();
          setClickedEventTitle("");
        })
      }
      if(includesCheck){ //기존 사람의 변경 및 삭제 여부.
        const filterTaskIdx = props.filteredTask.findIndex(event => event.id == id)
        console.log("어떻게 변경됨?")
        console.log(updatedTask)
        console.log("어떻게 변경됨?")

        put(`/task/${clickedEventId}`, {...updatedTask,userNo:userNo})
        dispatch(updateTask(clickedEventIdx, {...updatedTask,userNo:userNo}));

        props.closeModal();
        setClickedEventTitle("");

        if (filterTaskIdx > -1) {
          props.filteredTask[filterTaskIdx] = {...updatedTask,userNo:userNo}
          props.setFilteredTask([...props.filteredTask])}

      }else{
        deleteEventHandler()
        props.closeModal();
        setClickedEventTitle("");
      }
    } else {
        addedAssigns.map((assign)=>{
        const ids = []
        newCalendarEvents.map((event) => {ids.push(event.id)})
        const maxId = Math.max(...ids);
        const _addTask={...updatedTask,
          id: maxId + 1,
          userNo: assign,
        }
        post(`/task`, _addTask)
        dispatch(addTask([_addTask]));
        props.setFilteredTask([...props.filteredTask,_addTask])
        props.closeModal();
        setClickedEventTitle("");
      })
    }
    };

  const deleteEventHandler = () => {
    const clickedEventIdx = taskList.findIndex(event => event.id == id)
    const filterTaskIdx = props.filteredTask.findIndex(event => event.id == id)
    
    if (filterTaskIdx > -1) {
      remove(`/task/${id}`, id)
      dispatch(deleteTask(clickedEventIdx));
      props.filteredTask.splice(filterTaskIdx, 1)
      props.setFilteredTask([...props.filteredTask,props.filteredTask])
    }
    props.closeModal();
  }

  // const startDateChangeHandler = (date) => {
  //   setClickedStart(date)
  // }
  // const endDateChangeHandler = (date) => {
  //   setClickedEnd(date)
  // }
  const titleChangeHandler = (e) => {
    setClickedEventTitle(e.target.value)
  }

  const closeEventHandler = () => {
    props.closeModal();
    props.setState('')
  }
  return (
    <Modal className="addTaskModal"  overlayClassName="Overlay" isOpen={props.modalIsOpen} contentLabel="Example Modal" ariaHideApp={false}>
      <Row>
        <Col sm={10}>
      <h5>업무명</h5>
        <input type="text" value={clickedEventTitle} onChange={titleChangeHandler} required/></Col>
        <Col>
        {/* {
          clickedEventTitle===''? 
          <p style={{color:'red'}}>안됩니다!</p>:
          <p style={{color:'blue'}}>됩니다!</p> 
        } */}
        </Col>
      </Row>
      <Row>
        <Col sm={10}>
      <h6>시작 일자</h6>
      <StartDatePicker clickedStart={clickedStart} setClickedStart={setClickedStart}  disableClock={true} locale="ko-KO" /></Col>
      <Col>
        {/* {
          clickedStart===null? 
          <p style={{color:'red'}}>안됩니다!</p>:
          <p style={{color:'blue'}}>됩니다!</p> 
        } */}
        </Col>
      </Row>
      <Row>
        <Col sm={10}>
      <h6>종료 일자</h6>
      <EndDatePicker clickedEnd={clickedEnd} setClickedEnd={setClickedEnd}  disableClock={true} locale="ko-KO" /></Col>
      <Col>
      {/* {
          clickedEnd===null? 
          <p style={{color:'red'}}>안됩니다!</p>:
          <p style={{color:'blue'}}>됩니다!</p> 
        } */}
        </Col>
        </Row>
      <form onSubmit={onSubmit}>
        <Row>
          <Col sm={10}>
        <h6>프로젝트명</h6>
        <ProjectSelect state={props.state || null} setState={props.setState} clickedProject={clickedProject} setClickedProject={setClickedProject} setClickedProjectNo={setClickedProjectNo}/>
        </Col>
        <Col sm={2}>
        {/* {
          (!clickedProject)? 
          <p style={{color:'red'}}>안됩니다!</p>:
          <p style={{color:'blue'}}>됩니다!</p> 
        } */}
         </Col>
        </Row>
        <Row>
        <Col><div><h6>진행 상황</h6>
        <Status state={props.state} clickedStatus={clickedStatus} setClickedStatus={setClickedStatus}/></div></Col>
        
        <Col><h6>색상 설정</h6><div><ColorPicker clickedColor={clickedColor} setClickedColor={setClickedColor}/></div>
        </Col>
        </Row>
        <Row>
          <Col sm={10}>
        <h6>책임자</h6></Col>
        <AssignSelect defaultValue={props.state || null} addedAssigns={addedAssigns} setAddedAssigns={setAddedAssigns} includesCheck={includesCheck} setIncludeCheck={setIncludeCheck}/>
        <Col sm={2}>
        {/* {
          (!props.state)? 
          <p style={{color:'red'}}>안됩니다!</p>:
          <p style={{color:'blue'}}>됩니다!</p> 
        } */}
         </Col>
         </Row>
        <Button style={{marginTop: '10px', float:'right', borderColor:'#34d6ce',backgroundColor:'white'}} variant="outlined" type="button" onClick={closeEventHandler}>닫기</Button>
        <Button style={{marginTop: '10px',marginRight: '5px',float:'right', borderColor:'#34d6ce',backgroundColor:'white'}} variant="outlined" type="button" onClick={deleteEventHandler}>삭제</Button>
        <Button style={{marginTop: '10px',marginRight: '5px',float:'right', borderColor:'#34d6ce',backgroundColor:'white'}} variant="outlined" type="submit">등록</Button>

      </form>
    </Modal>
  )
}
export default memo(AddTask);
