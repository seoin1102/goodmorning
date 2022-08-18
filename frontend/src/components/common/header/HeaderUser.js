import React from 'react';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Button, Container, Dropdown, DropdownButton, Nav, Navbar, NavDropdown } from 'react-bootstrap';


function HeaderUser() {

    
    const onClickLogout = async function() {
        console.log("스토리지:" + localStorage.getItem('authUser'));
        try {

          const response = await fetch('/api/user/logout', {
            method: 'get',
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',  
              'Accept': 'application/json'
            },
          });
    
          if(!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
          }

          const json = await response.json();

          if(json.result !== 'success') {
            throw new Error(`${json.result} ${json.message}`);  
          }
            callback("로그아웃 되었습니다.","/signin")
            localStorage.setItem('authUser','');
            console.log("스토리지:" + localStorage.getItem('authUser'));
        } catch(err) {
          console.log(typeof(err));
          callback(err.toString(),"/signin")
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
                            <Navbar.Brand >"~~님"</Navbar.Brand>
                                <Nav.Link href="#home">내정보</Nav.Link>
                                <Nav.Link href="/signin" onclick={onClickLogout}>Logout</Nav.Link>
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