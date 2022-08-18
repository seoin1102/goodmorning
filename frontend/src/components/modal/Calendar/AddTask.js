
import React, { useState, useEffect, useCallback } from "react";
import Modal from "react-modal";
import DatePicker from "react-datetime-picker";
import Select from "react-select";
import "../../../styles/css/Calendar.css";
import { setTask, addTask, deleteTask, updateTask } from '../../../redux/task';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {put, post} from '../../../apis/Axios';
import moment from 'moment';


function AddTask(props) {
  const { title, start, end, id } = props.state
  const [clickedEventTitle, setClickedEventTitle] = useState()
  const [clickedEventStart, setClickedEventStart] = useState()
  const [clickedEventEnd, setClickedEventEnd] = useState()

  const [clickedEventAssign, setClickedEventAssign] = useState("")
  const [clickedEventId, setClickedEventId] = useState("");
  const [assignEvents, setAssignEvents] = useState("");

  useEffect(()=>{
    setClickedEventTitle(title)
    setClickedEventStart(start)
    setClickedEventEnd(end)
  },[props])

  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault(); // Submit 이벤트 발생했을 때 새로고침 방지

    let newCalendarEvents = [...props.taskList];
    let clickedEventId = props.state.id
    if (clickedEventId) {
      const clickedEventIdx = newCalendarEvents.findIndex(
        (event) => event.id == clickedEventId
      );

      const updatedTask={
        title: clickedEventTitle,
        start:clickedEventStart,
        end: clickedEventEnd,
        id
      }

      newCalendarEvents[clickedEventIdx].title = clickedEventTitle
      newCalendarEvents[clickedEventIdx].start = props.state.start;
      newCalendarEvents[clickedEventIdx].end = props.state.end;
      let li = [];
      for (let i in clickedEventAssign) {
        li.push(clickedEventAssign[i].value);
      }
      dispatch(updateTask(clickedEventIdx, updatedTask));
      put(`/task/${clickedEventId}`, updatedTask)

    } else {
      const ids = newCalendarEvents.map((event) => {
        return event.id;
      });
      const maxId = Math.max(...ids);
      // let li = [];
      // for (let i in clickedEventAssign) {
      //   li.push(clickedEventAssign[i].value);
      // }
      props.state.id = maxId + 1
      console.log(props.state)
      props.state.start = moment(props.state.start).format('YYYY-MM-DD HH:mm')
      props.state.end = momentfdfddf(props.state.start).format('YYYY-MM-DD HH:mm')
      // newCalendarEvents.push({
      //   title: clickedEventTitle,
      //   start: clickedEventStartDate,
      //   end: clickedEventEndDate,
      //   id: maxId + 100,
      // });
      props.state.title = clickedEventTitle
      dispatch(addTask([props.state]));
      post(`/task`, props.state)
    }

    props.closeModal();
    setClickedEventTitle("");
  };

  function getRandomColor() {
    return `hsl(${parseInt(Math.random() * 24, 10) * 15}, 16%, 57%)`;
  }

  const assigns = [
    { value: "김서인", label: "김서인", no: 1 },
    { value: "김휘민", label: "김휘민", no: 2 },
    { value: "최시창", label: "최시창", no: 3 },
    { value: "김현석", label: "김현석", no: 4 },
  ]

  const deleteEventHandler = () => {
    let newCalendarEvents = [...props.taskList];

    const clickedEventIdx = newCalendarEvents.findIndex(event => event.id == clickedEventId)
    console.log(clickedEventIdx)
    dispatch(deleteTask(props.state, 1));
    props.closeModal();
  }

  const startDateChangeHandler = (date) => {
    setClickedEventStart(moment.utc(date).format('YYYY-MM-DD HH:mm'))
  }
  const endDateChangeHandler = (date) => {
    setClickedEventEnd(moment.utc(date).format('YYYY-MM-DD HH:mm'))
  }
  const titleChangeHandler = (e) => {
    setClickedEventTitle(e.target.value)
  }

  // const assignChangeHandler = (clickedEventAssign) => {
  //   setClickedEventAssign(clickedEventAssign)
  //   const li = []
  //   // for(let i=0; i < clickedEventAssign.length; i++){
  //   //   li.push(clickedEventAssign[i].label)
  //   // }

  //   for (let i; calendarEvents.length; i++) {
  //     if (calendarEvents[i].classNames) {
  //       li.push(calendarEvents[i])
  //       console.log("왜???")
  //     }
  //   }
  //   setAssignEvents(li)

  //   //setAssignEvents()
  // }
  return (

    <Modal className="addTaskModal" overlayClassName="Overlay" isOpen={props.modalIsOpen} contentLabel="Example Modal" ariaHideApp={false}>
      <h4>시작 일자</h4>
      <DatePicker value={clickedEventStart} onChange={startDateChangeHandler} format="y-MM-dd hh:mm a" disableClock={true} locale="ko-KO" />
      <h4>종료 일자</h4>
      <DatePicker value={clickedEventEnd} onChange={endDateChangeHandler} format="y-MM-dd hh:mm a" disableClock={true} locale="ko-KO" />
      <form onSubmit={onSubmit}>
        <h4>업무명</h4>
        <input type="text" value={clickedEventTitle} onChange={titleChangeHandler} />
        <br />
        <Select options={assigns} placeholder="참여자를 고르세요" value={clickedEventAssign} isSearchable={true} isMulti />
        <button type="submit">등록</button>
        <button type="button" onClick={deleteEventHandler}>삭제</button>
        <button type="button" onClick={props.closeModal}>닫기</button>
      </form>
    </Modal>

  )
}
export default AddTask;
