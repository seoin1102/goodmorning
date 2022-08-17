import React, { useState } from 'react';
import { Button, Dropdown, Modal, NavItem, NavLink } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import ChannelSetting_info from './ChannelSetting_info';
import Channelsetting_set from './Channelsetting_set';

function ChannelSetting({modalShow, onClickModal}) {
    let [tab, setTab] = useState(0);

    function TabContent() {
        if (tab === 0) return <ChannelSetting_info />
        else if (tab === 1) return <Channelsetting_set />
        // else return <div>2</div>
      }
      
    return (
        <>
        <Modal show={modalShow} onHide={onClickModal}>
        <Modal.Header closeButton>
            <Modal.Title>채널 설정</Modal.Title>
        </Modal.Header>
      <Nav  variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link eventKey="link-0" onClick={() => setTab(0)}>
            정보
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" onClick={() => setTab(1)}>
            설정
          </Nav.Link>
        </Nav.Item>
        {/* <Nav.Item>
          <Nav.Link eventKey="link-2" onClick={() => setTab(2)}>
            Option 2
          </Nav.Link>
        </Nav.Item> */}
      </Nav>
      <TabContent />
      <Modal.Footer>
            <Button variant="outline-dark" type="submit" onClick={onClickModal} >
              취소
            </Button>
            <Button variant="outline-dark" type="submit" >
              변경사항 저장
            </Button>
        </Modal.Footer>
      </Modal>
        </>
    );

    
}

export default ChannelSetting;