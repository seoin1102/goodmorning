import React from 'react';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Button, Container, Dropdown, DropdownButton, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { setChannel } from '../../../redux/channel';
import { fetchGetResponse, checkResponse } from '../../../apis/Fetch';

function HeaderUser({user, channelList, onChangeChannel}) {
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


    return (
        <Grid item xs={3}>
            <List>
                    <Navbar expand="lg" style={{height: '60px'}}>
                        <Container >
                            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                            <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ms-auto">
                            <Navbar.Brand >{user.name}</Navbar.Brand>
                            <NavDropdown
                              id="nav-dropdown-dark-example"
                              title="채널목록"
                              menuVariant="dark"
                            >
                            {
                              channelList.length !== 0 ?
                              (
                                channelList.map((channel, index) => 
                                <NavDropdown.Item
                                onClick={() => { 
                                  return onChangeChannel(channel.no, user.no)}}
                                  key={index} >
                                    {channel.name}
                                </NavDropdown.Item>)
                              ) : ''
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