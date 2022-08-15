
import React, { useState, useEffect, useCallback  } from "react";
import Modal from "react-modal";
import DatePicker from "react-datetime-picker";
import Select from "react-select";

function AddTask(props){

    const [clickedEventStartDate, setClickedEventStartDate] = useState("")
    const [clickedEventEndDate, setClickedEventEndDate] = useState("")
    const [clickedEventTitle, setClickedEventTitle] = useState("")
    const [clickedEventAssign, setClickedEventAssign] = useState("")
    const [startDate, setStartDate] = useState(new Date());
    const [clickedEventId, setClickedEventId] = useState("");
    const [assignEvents, setAssignEvents] = useState("");

    const onSubmit = (e) => {
        e.preventDefault(); // Submit 이벤트 발생했을 때 새로고침 방지
    
        let newCalendarEvents = [...calendarEvents];
        if (clickedEventId) {
          console.log(clickedEventId);
          const clickedEventIdx = newCalendarEvents.findIndex(
            (event) => event.id == clickedEventId
          );
          console.log(clickedEventIdx);
    
          newCalendarEvents[clickedEventIdx].title = clickedEventTitle;
          newCalendarEvents[clickedEventIdx].start = clickedEventStartDate;
          newCalendarEvents[clickedEventIdx].end = clickedEventEndDate;
          newCalendarEvents[clickedEventIdx].backgroundColor = getRandomColor();
          let li = [];
          for (let i in clickedEventAssign) {
            li.push(clickedEventAssign[i].value);
          }
          newCalendarEvents[clickedEventIdx].classNames = clickedEventAssign;
        } else {
          const ids = newCalendarEvents.map((event) => {
            return event.id;
          });
          const maxId = Math.max(...ids);
          let li = [];
          for (let i in clickedEventAssign) {
            li.push(clickedEventAssign[i].value);
          }
          newCalendarEvents.push({
            title: clickedEventTitle,
            start: clickedEventStartDate,
            end: clickedEventEndDate,
            id: maxId + 1,
            backgroundColor: getRandomColor(),
            classNames: clickedEventAssign,
          });
        }
    
        setCalendarEvents(newCalendarEvents);
        // props.closeModal;
        setClickedEventTitle("");
      };

    function getRandomColor() {
        return `hsl(${parseInt(Math.random() * 24, 10) * 15}, 16%, 57%)`;
      }
    
    const assigns=[
        {value: "김서인", label: "김서인", no:1},
        {value: "김휘민", label: "김휘민", no:2},
        {value: "최시창", label: "최시창", no:3},
        {value: "김현석", label: "김현석", no:4},
      ]

    const deleteEventHandler = () =>{
    let newCalendarEvents = [...calendarEvents];

    const clickedEventIdx = newCalendarEvents.findIndex(event => event.id == clickedEventId)
    console.log(clickedEventIdx)
    newCalendarEvents.splice(clickedEventIdx, 1);
    setCalendarEvents(newCalendarEvents)
    props.closeModal();

}
    const titleChangeHandler = (e) =>{
    setClickedEventTitle(e.target.value)
    }

    const assignChangeHandler=(clickedEventAssign)=>{
        setClickedEventAssign(clickedEventAssign)
        const li = []
        // for(let i=0; i < clickedEventAssign.length; i++){
        //   li.push(clickedEventAssign[i].label)
        // }
    
        for(let i; calendarEvents.length; i++){
          if(calendarEvents[i].classNames){
            li.push(calendarEvents[i])
            console.log("왜???")
          }
        }
        setAssignEvents(li)
    
        //setAssignEvents()
    }
    const endDateChangeHandler = (date) => {
        //setStartDate(date)
        setClickedEventEndDate(date)
    }

    const startDateChangeHandler = (date) => {
        //setStartDate(date)
        props.setState(date)
    }

 
    
  return(
    <div>
        <Modal isOpen={props.modalIsOpen} contentLabel="Example Modal" ariaHideApp={false}>
            <h4>시작 일자</h4>
            <DatePicker value={props.state.start} selected={props.setState} onChange={startDateChangeHandler} format="y-MM-dd hh:mm a" disableClock={true} locale="ko-KO"/>      
            <h4>종료 일자</h4>
            <DatePicker value={props.state.end} selected={setClickedEventEndDate} onChange={endDateChangeHandler} format="y-MM-dd hh:mm a"  disableClock={true} locale="ko-KO"/>
            <form onSubmit={onSubmit}>
                <h4>업무명</h4>
                <input type="text" value={clickedEventTitle} onChange={titleChangeHandler}/>
                <br/>
                <Select options={assigns} placeholder="참여자를 고르세요" value={clickedEventAssign} onChange={assignChangeHandler} isSearchable={true} isMulti/>
                <button type="submit">등록</button>
                <button onClick={deleteEventHandler}>삭제</button>
                <button onClick={props.closeModal}>닫기</button>
            </form>
        </Modal>
    </div>
  )
  }
export default AddTask;
  