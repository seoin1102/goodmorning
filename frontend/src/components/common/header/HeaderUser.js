import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Button, Container, Dropdown, DropdownButton, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { setChannel } from '../../../redux/channel';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { resetCHATALARM } from '../../../redux/chatAlarm';
import { fetchGetResponse, checkResponse } from '../../../apis/Fetch';
import '../../../styles/css/DropDown.css';
import { Badge } from '@mui/material';


function HeaderUser({user, channelList, onChangeChannel, totalSum, setTotalSum}) {
  
  const chatAlarmList = useSelector(state => (state.chatAlarm));
  const dispatch = useDispatch();

  // 고칠 코드
  useEffect(() => {
 
    let _totalSum2 = 0;
    channelList.map((channel) => {
    chatAlarmList.map((chatAlarm) => {
          if(chatAlarm.channelNo == channel.no){
              _totalSum2= _totalSum2 +  chatAlarm.count;
              setTotalSum( _totalSum2);
          }
      })

    })
    }, [channelList, chatAlarmList])
  
  const onClickLogout = async function() {
    try {
          const response =  await fetchGetResponse('/api/user/logout','get','formjsonHeader');
          const json = await checkResponse(response);   
          localStorage.setItem('authUser','');
          location.href="/signin"
    
        } catch(err) {
          alert(err)
      } 
    }

    const styles = {
      fontSize: '1rem',
      color: 'white', 
      fontWeight: 'bold'
    }


    return (
        <Grid item xs={3}>
            <List>
                    <Navbar expand="lg" style={{height: '60px'}}>
                        <Container >
                            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                            <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ms-auto">
                            <Navbar.Brand style={{fontSize: '1.2rem', color: 'white', fontWeight: 'bold'}}>{user.name}</Navbar.Brand>
                            <Nav.Link href="#home" style={{fontSize: '1rem', color: 'white', fontWeight: 'bold'}}>내정보</Nav.Link>
                            <Badge 
                            badgeContent={totalSum === 0 ? null : totalSum} 
                            color="warning"  sx={{ "& .MuiBadge-badge": { fontSize: 15, height: 20, minWidth: 20, margin: '0px 20px 0px 0px' } }} anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                            }} >
                            <NavDropdown
                              id="nav-dropdown"
                              title={"워크스페이스 목록"}
                              menuVariant="white"
                            >
                          
                          { 
                              channelList.length !== 0 ?                            
                             
                                (channelList.map((channel, index) => {
                                  let sum = 0;
                                  chatAlarmList.map((chatAlarm) => {
                                      if(chatAlarm.channelNo == channel.no){
                                          sum = sum + chatAlarm.count;                                        
                                      }
                                  })
                                return (
                                <NavDropdown.Item
                                onClick={() => {
                                  dispatch(resetCHATALARM());
                                  return onChangeChannel(channel.no, user.no)}}
                                  key={index} >
                                    {channel.name}   {sum}
                                </NavDropdown.Item>)
                                })) : ''
                            }
                            </NavDropdown>
                            </Badge>
                                <Nav.Link href="#signin" onClick={onClickLogout} style={{fontSize: '1rem', color: 'white', fontWeight: 'bold'}}>Logout</Nav.Link>
                                
                            </Nav>
                            
                            </Navbar.Collapse>
                            
                        </Container>
                    </Navbar>
            </List>
            <Divider />
        </Grid>
    );
}

export default React.memo(HeaderUser);