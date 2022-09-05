import React, { useCallback, useState } from 'react';
import { Button, Form, Modal, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { get, postJson, remove } from '../../../apis/Axios';
import CrewSetting_info from './CrewSetting_info';
import CrewSetting_member from './CrewSetting_member';
import CrewSetting_set from './CrewSetting_set';
import Swal from 'sweetalert2';
import { setCHANNELCREWFOCUS } from '../../../redux/focus';

function CrewSetting({modalShow,onClickModal, users, crewName, channelNo, crewNo, initialUser, userNo, masterCrewNo }) {

  let [tab, setTab] = useState(0);
  const dispatch = useDispatch();

  const onClickCrewInvite = async(user) => {
    const userEmail = JSON.stringify({email: user})
    const result = await postJson(`/crew/invite/${channelNo}/${crewNo}`, userEmail);
    
    if(result.data == "success"){
      Swal.fire({
          icon: 'success',
          title: '채널 초대에 성공하셨습니다.',
        })
    } else{
      Swal.fire({
          icon: 'error',
          title: '채널 초대에 실패하셨습니다.',
          text: '이메일을 다시 확인해 주세요.'
        })
      }
      initialUser();
  }
  
  const initialFocus = useCallback(async(userNo) => {
    const Focus = await get(`/channel/${userNo}`);
    const {no, name, crewNo, crewName} = Focus[0];
    dispatch(setCHANNELCREWFOCUS({
        channelName: name, 
        channelNo: no,
        crewName: crewName,
        crewNo: crewNo
    }))
}, [])

  const onClickCrewDelete = async() => {
    if(crewName === '기본 채널'){
      Swal.fire({
          icon: 'error',
          title: '현재 채널은 기본 채널입니다.',
          text: '모든 워크스페이스에는 이 워크스페이스의 모든 멤버가 포함된 하나의 채널이 있습니다. 바로 이 채널을 사용하면 됩니다.'
        })
      }
    else{
    await remove(`/crew/delete/${crewNo}/${userNo}`);
    onClickModal();
    initialFocus(userNo);
    }
  }

  function TabContent() {
      if (tab === 0) return <CrewSetting_info 
                            crewName={crewName} 
                            onClickModal={onClickModal} 
                            setTab={setTab}
                            crewNo={crewNo}
                            onClickCrewDelete={onClickCrewDelete}
                            masterCrewNo={masterCrewNo}
                            userNo={userNo}

                            />
      else if (tab === 1) return <CrewSetting_member 
                          users={users} 
                          onClickModal={onClickModal} 
                          setTab={setTab}
                          onClickCrewInvite={onClickCrewInvite}
                          initialUser={initialUser}/>
      // else return <CrewSetting_set onClickModal={onClickModal} setTab={setTab}/>
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
       {/* <Nav.Item>
        <Nav.Link eventKey="link-2" onClick={() => setTab(2)}>
          설정
        </Nav.Link>
      </Nav.Item>  */}
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