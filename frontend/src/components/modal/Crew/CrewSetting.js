import React, { useState } from 'react';
import { Button, Form, Modal, Nav } from 'react-bootstrap';
import CrewSetting_info from './CrewSetting_info';
import CrewSetting_member from './CrewSetting_member';
import CrewSetting_set from './CrewSetting_set';

function CrewSetting({modalShow,onClickModal}) {

  let [tab, setTab] = useState(0);

  function TabContent() {
      if (tab === 0) return <CrewSetting_info />
      else if (tab === 1) return <CrewSetting_member />
      else return <CrewSetting_set />
    }
    
  return (
      <>
      <Modal show={modalShow} onHide={onClickModal}>
      <Modal.Header closeButton>
          <Modal.Title>크루 설정</Modal.Title>
      </Modal.Header>
    <Nav variant="tabs" defaultActiveKey="link-0">
      <Nav.Item>
        <Nav.Link eventKey="link-0" onClick={() => setTab(0)}>
          정보
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1" onClick={() => setTab(1)}>
          멤버
        </Nav.Link>
      </Nav.Item>
       <Nav.Item>
        <Nav.Link eventKey="link-2" onClick={() => setTab(2)}>
          설정
        </Nav.Link>
      </Nav.Item> 
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

export default CrewSetting;