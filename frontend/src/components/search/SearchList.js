// 1단계: 문 가져오기
import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import SearchResult from "./SearchResult";
import {Card, CardContent, Button, Typography, Box, Paper, List} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { setCREWFOCUS } from '../../redux/focus';
import '../../styles/css/Header.css'
export default function SearchList(props) {
    const dispatch = useDispatch();

    const searchList = useSelector(state => (state.search), shallowEqual);
    const channelNo = useSelector(state => {
        return state.focus.channelNo;
    }, shallowEqual);
    console.log(channelNo)
    console.log(searchList)

    const result = searchList.filter(
        (e) =>e.message.indexOf(props.searchText) !== -1 );
  
    return (
        <div style={{height:'670px' , overflow:'auto', width:'1300px'}}>
            {result != '' ? result.map((e)=>
            <div >
            <CardContent className='searchcard'>
                <div style={{display:'flex', alignItems:"center"}}>
                <div>
                <Typography sx={{ fontSize: 12, fontWeight: 'bolder' }} color="text.secondary" gutterBottom>
                {e.crewName} 
                </Typography>
                </div>
                <div>
                <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                &nbsp; {e.userName}
                </Typography>
                </div>
                </div>
                <Typography variant="h8" component="div">
                {e.message}
                </Typography>
                <Typography sx={{ mb: 1.3, fontSize: 12 }} color="text.secondary">
                {e.sendDate}
                </Typography>
                {/* <Typography variant="body2">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
                </Typography> */}
                <NavLink to={'/searchresult'} style={{textDecoration:'none'}} state={{search:e.message}}>
                    <Button size="small" onClick={()=>dispatch(setCREWFOCUS({no: e.crewNo, name: e.crewName}))}>채팅방가기</Button>
                </NavLink>
            </CardContent>
            </div>
           
            
            )
            :
            <div>검색결과가 없습니다. 다시 검색해주세요.</div>}
            
    </div>
    );
}