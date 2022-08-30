import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Button, Container, Dropdown, DropdownButton, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { setChannel } from '../../../redux/channel';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { resetCHATALARM } from '../../../redux/chatAlarm';



function HeaderUser({user, channelList, onChangeChannel, totalSum, setTotalSum}) {
  
  const chatAlarmList = useSelector(state => (state.chatAlarm));
  const dispatch = useDispatch();

    const onClickLogout = async function() {
      
    try {
          const response = await fetch('/api/user/logout', {
              method: 'get',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
              }
          });

          if(!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
          }

          const json = await response.json();

          if(json.result !== 'success') {
            throw new Error(`${json.result} ${json.message}`);
          }

            const message = json.message; 
            // alert("");
            location.href="/signin"
            localStorage.setItem('authUser','');


        } catch(err) {
          alert(err)
      } 
    }

    return (
        <Grid item xs={3}>
            <List>
                    <Navbar expand="lg" style={{height: '60px'}}>
                        <Container >
                            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                            <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ms-auto">
                            <Navbar.Brand style={{fontSize: '1rem', color: '#E2BA89', fontWeight: 'bold'}}>{user.name}</Navbar.Brand>
                            <NavDropdown
                              id="nav-dropdown-dark-example"
                              title={`채널목록${totalSum}`}
                              menuVariant="dark"
                            >
                          
                            { 
                              channelList.length !== 0 ?                            
                             
                                (channelList.map((channel, index) => {
                                  let sum = 0;
                                  let totalSum2 = 0;
                                  chatAlarmList.map((chatAlarm) => {
                                      if(chatAlarm.channelNo == channel.no){
                                          sum = sum + chatAlarm.count;                                        
                                          totalSum2= totalSum2 +  chatAlarm.count;
                                          setTotalSum(totalSum2)
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
                                <Nav.Link href="#home">내정보</Nav.Link>
                                <Nav.Link href="#signin" onClick={onClickLogout}>Logout</Nav.Link>

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