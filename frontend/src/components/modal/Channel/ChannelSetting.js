import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Modal, NavItem, NavLink } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { post, postJson, putJson } from '../../../apis/Axios';
import { setCHANNELFOCUS } from '../../../redux/focus';
import ChannelSetting_info from './ChannelSetting_info';
import ChannelSetting_member from './ChannelSetting_member';
import Channelsetting_set from './Channelsetting_set';
import Swal from 'sweetalert2';

function ChannelSetting({modalShow, onClickModal,users, initialUser}) {
    let [tab, setTab] = useState(0);
    const channelName = useSelector(state => {
      return state.focus.channelName;
    });
    
    const channelNo = useSelector(state => {
      return state.focus.channelNo;
    });

    const dispatch = useDispatch();

    const onClickHandler = async(channelName) => {
      const updateChannel = JSON.stringify({
            no: channelNo,
            name: channelName,
            description: '',
            creationDate: '',
            masterChannelUserNo: 0
        })

        await putJson(`/channel/${channelNo}`, updateChannel);
        dispatch(setCHANNELFOCUS({name: channelName, no: channelNo}));
        onClickModal();
    }

    const onClickChannelInvite = async(channelNo, user) => {
      const userEmail = JSON.stringify({email: user})
      const result = await postJson(`/channel/invite/${channelNo}`, userEmail);
      console.log(result.data);
      if(result.data == "success"){
          Swal.fire({
              icon: 'success',
              title: '워크 스페이스 초대에 성공하셨습니다.',
            })
        } else{
          Swal.fire({
              icon: 'error',
              title: '워크 스페이스 초대에 실패하셨습니다.',
              text: '이메일을 다시 확인해 주세요.'
            })
          }
          initialUser();
    }

    

    function TabContent() {
        if (tab === 0) return <ChannelSetting_info 
            onClickHandler={onClickHandler}
            channelName={channelName}
            onClickModal={onClickModal}
             />
        else if (tab === 1) return <ChannelSetting_member 
                onClickModal={onClickModal}
                setTab={setTab}
                channelNo={channelNo}
                users={users}
                onClickChannelInvite={onClickChannelInvite}
                initialUser={initialUser} />
        // else if (tab === 2) return <Channelsetting_set 
        // onClickModal={onClickModal}
        // setTab={setTab} />
      }
    
    return (
        <>
        <Modal show={modalShow} onHide={onClickModal} backdrop="static">
        <Modal.Header closeButton>
            <Modal.Title>{channelName}</Modal.Title>
        </Modal.Header>
      <Nav  variant="tabs" defaultActiveKey="link-0">
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
        </Nav.Item> */}
      </Nav>
      <TabContent />
      </Modal>
        </>
    );

    
}

export default ChannelSetting;