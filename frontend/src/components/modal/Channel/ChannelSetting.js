import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Modal, NavItem, NavLink } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { post, postJson, putJson } from '../../../apis/Axios';
import { setCHANNELFOCUS } from '../../../redux/focus';
import ChannelSetting_info from './ChannelSetting_info';
import Channelsetting_set from './Channelsetting_set';

function ChannelSetting({modalShow, onClickModal,users}) {
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
      await postJson(`/channel/invite/${channelNo}`, userEmail);
    }

    function TabContent() {
        if (tab === 0) return <ChannelSetting_info 
            onClickHandler={onClickHandler}
            channelName={channelName}
            channelNo={channelNo}
            onClickModal={onClickModal}
            // users={users}
            onClickChannelInvite={onClickChannelInvite} />
        else if (tab === 1) return <Channelsetting_set 
                onClickModal={onClickModal}
                setTab={setTab} />
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
            설정
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent />
      </Modal>
        </>
    );

    
}

export default ChannelSetting;