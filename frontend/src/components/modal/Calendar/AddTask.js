
import React, { useState, useEffect, memo } from "react";
import { useSelector, useDispatch, shallowEqual  } from 'react-redux';

import Modal from "react-modal";
import DatePicker from "react-datetime-picker";
import "../../../styles/css/Calendar.css";
import { addTask, deleteTask, updateTask } from '../../../redux/task';
import {put, post, remove} from '../../../apis/Axios';
import moment from 'moment';
import AssignSelect from '../../calendar/AssignSelect'

function AddTask(props) {
  const { title, start, end, id, userName, userNo } = props.state
  const [clickedEventTitle, setClickedEventTitle] = useState()
  const [clickedEventStart, setClickedEventStart] = useState()
  const [clickedEventEnd, setClickedEventEnd] = useState()
  const [clickedEventUserNo,setClickedEvenUserNo] = useState()

  const [clickedEventId, setClickedEventId] = useState();
  const [addedAssigns, setAddedAssigns]= useState([]);
  const [includesCheck, setIncludeCheck] = useState(true);

  useEffect(()=>{
    setClickedEventTitle(title)
    setClickedEventStart(start)
    setClickedEventEnd(end)
    setClickedEvenUserNo(userNo)
  },[props])

  const dispatch = useDispatch();
  const taskList = useSelector(state => state.task, shallowEqual);
  let newCalendarEvents = [...taskList];

    const onSubmit = (e) => {
    e.preventDefault(); // Submit 이벤트 발생했을 때 새로고침 방지

    let clickedEventId = props.state.id
    const updatedTask={
      title: clickedEventTitle,
      start:moment(clickedEventStart).format('YYYY-MM-DD HH:mm'),
      end: moment(clickedEventEnd).format('YYYY-MM-DD HH:mm'),
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
          dispatch(addTask([_addTask]));
        })
      }
      
      if(includesCheck){ //기존 사람의 변경 및 삭제 여부.
        
        put(`/task/${clickedEventId}`, {...updatedTask,userNo:userNo})
        dispatch(updateTask(clickedEventIdx, {...updatedTask,userNo:userNo}));
      }else{
        deleteEventHandler()
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
      })
    }

    props.closeModal();
    setClickedEventTitle("");};

  function getRandomColor() {
    return `hsl(${parseInt(Math.random() * 24, 10) * 15}, 16%, 57%)`;}

  const deleteEventHandler = () => {
    
    const clickedEventIdx = taskList.findIndex(event => event.id == clickedEventId)
    remove(`/task/${id}`, id)
    dispatch(deleteTask(clickedEventIdx));
    props.closeModal();
  }

  const startDateChangeHandler = (date) => {
    setClickedEventStart(date)
  }
  const endDateChangeHandler = (date) => {
    setClickedEventEnd(date)
  }
  const titleChangeHandler = (e) => {
    setClickedEventTitle(e.target.value)
  }

  const closeEventHandler = () => {
    props.closeModal();
    props.setState('')
  }

  return (

    <Modal className="addTaskModal" overlayClassName="Overlay" isOpen={props.modalIsOpen} contentLabel="Example Modal" ariaHideApp={false}>
      <h4>시작 일자</h4>
      <DatePicker value={clickedEventStart} onChange={startDateChangeHandler}  disableClock={true} locale="ko-KO" />
      <h4>종료 일자</h4>
      <DatePicker value={clickedEventEnd} onChange={endDateChangeHandler}  disableClock={true} locale="ko-KO" />
      <form onSubmit={onSubmit}>
        <h4>업무명</h4>
        <input type="text" value={clickedEventTitle} onChange={titleChangeHandler} />
        <br />
        <h4>책임자</h4>
        <AssignSelect defaultValue={props.state || null} addedAssigns={addedAssigns} setAddedAssigns={setAddedAssigns} includesCheck={includesCheck} setIncludeCheck={setIncludeCheck}/>
        <button type="submit">등록</button>
        <button type="button" onClick={deleteEventHandler}>삭제</button>
        <button type="button" onClick={closeEventHandler}>닫기</button>
      </form>
    </Modal>

  )
}
export default memo(AddTask);
