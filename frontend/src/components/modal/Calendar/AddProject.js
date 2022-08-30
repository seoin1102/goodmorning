
import React, { useState, useEffect, memo } from "react";
import { useSelector, useDispatch, shallowEqual  } from 'react-redux';
import { Row, Col } from "react-bootstrap";

import DatePicker from "react-datetime-picker";
import "../../../styles/css/Calendar.css";
import {put, post, remove} from '../../../apis/Axios';
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

function AddProject(props) {
  
  const [state, setState] = useState()
  const [clickedStart, setClickedStart] = useState()
  const [clickedEnd, setClickedEnd] = useState()
  const [clickedName, setClickedName] = useState()
  const [clickedDescript, setClickedDescript] = useState()
  const [clickedStatus, setClickedStatus] = useState();

  useEffect(()=>{
    
  },[])
  const projectList = useSelector((state) => state.project, shallowEqual);
  const crewNo = useSelector(state => state.focus.crewNo, shallowEqual);


  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const ids = []
  projectList.map((event) => {ids.push(event.id)})
  const maxId = Math.max(...ids);
  const onSubmit = (e) => {
    e.preventDefault();
    const updatedTask={
      projectName: clickedName,
      start:moment(clickedStart).format('YYYY-MM-DD HH:mm'),
      end: moment(clickedEnd).format('YYYY-MM-DD HH:mm'),
      description: clickedDescript,
      status: clickedStatus,
      crewNo: crewNo,
      id: maxId+1
    }

    post(`/project`,  updatedTask)
    dispatch(addProject([ updatedTask]));
    props.handleClose();
  }


const nameHandler = (e) =>{
  setClickedName(e.target.value)
}

const startHandler = (date) => {
  setClickedStart(date)
}
const endHandler = (date) => {
  setClickedEnd(date)
}

const descriptHandler =(e)=>{
  setClickedDescript(e.target.value)
}

  return (
    <>
    
      <Modal show={props.show} onHide={props.handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>프로젝트 추가</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>프로젝트 명</Form.Label>
              <Form.Control
                type="text"
                placeholder="프로젝트 이름을 입력해주세요."
                autoFocus
                value={clickedName} onChange={nameHandler}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>시작일시</Form.Label>
              <br />
              <DatePicker value={clickedStart} onChange={startHandler}  disableClock={true} locale="ko-KO" />
              <br /><br />
              <Form.Label>종료일시</Form.Label>
              <br />
              <DatePicker value={clickedEnd} onChange={endHandler}  disableClock={true} locale="ko-KO" />
              <br /><br />
              <Form.Label>설명</Form.Label>
              <br />
              <Form.Control as="textarea" rows={3} onChange={descriptHandler} value={clickedDescript}/>
              <br /><br />
              <Form.Label>상태</Form.Label>
              <Stack spacing={3} sx={{ width: 500 }}>
              <Status state={state} setClickedStatus={setClickedStatus} clickedStatus={clickedStatus}/>
            </Stack>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
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
