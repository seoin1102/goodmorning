import React, { useState } from 'react';
import { Button, Form, Modal, Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { postJson } from '../../../apis/Axios';
import CrewSetting_info from './CrewSetting_info';
import CrewSetting_member from './CrewSetting_member';
import CrewSetting_set from './CrewSetting_set';

function CrewSetting({modalShow,onClickModal, users, crewName, channelNo, crewNo }) {

  let [tab, setTab] = useState(0);

  const onClickCrewInvite = async(user) => {
    const userEmail = JSON.stringify({email: user})
    await postJson(`/crew/invite/${channelNo}/${crewNo}`, userEmail);
  }


  function TabContent() {
      if (tab === 0) return <CrewSetting_info 
                            crewName={crewName} 
                            onClickModal={onClickModal} 
                            setTab={setTab}
                            crewNo={crewNo}/>
      else if (tab === 1) return <CrewSetting_member 
                          users={users} 
                          onClickModal={onClickModal} 
                          setTab={setTab}
                          onClickCrewInvite={onClickCrewInvite}/>
      else return <CrewSetting_set onClickModal={onClickModal} setTab={setTab}/>
    }
    
  return (
      <>
      <Modal show={modalShow} onHide={onClickModal} backdrop="static">
      <Modal.Header closeButton>
          <Modal.Title>{crewName}</Modal.Title>
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
    {/* <Modal.Footer>
          <Button variant="outline-dark"  onClick={onClickModal} >
            취소
          </Button>
          <Button variant="outline-dark"  >
            변경사항 저장
          </Button>
      </Modal.Footer> */}
    </Modal>
      </>
    );
}

export default CrewSetting;