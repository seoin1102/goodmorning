import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Modal, NavItem, NavLink } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { putJson } from '../../../apis/Axios';
import { setCHANNELFOCUS } from '../../../redux/focus';
import ChannelSetting_info from './ChannelSetting_info';
import Channelsetting_set from './Channelsetting_set';

function ChannelSetting({modalShow, onClickModal}) {
    let [tab, setTab] = useState(0);

    const channelName = useSelector(state => {
      return state.focus.channelName;
    });

    const channelNo = useSelector(state => {
      return state.focus.channelNo;
    });

    const [text, setText] = useState(channelName);
    const [description, setDescription] = useState("");

    const onChangeValue = () => {
      // console.log(channelName);
      // dispatch(setCHANNELFOCUS({name: channelName}));
      // onClickModal();
    }
    const dispatch = useDispatch();

    const onClickHandler = async() => {
      const updateChannel = JSON.stringify({
            no: channelNo,
            name: text,
            description: description,
            creationDate: '',
            masterChannelUserNo: 0
        })

        await putJson(`/channel/${channelNo}`, updateChannel);
        dispatch(setCHANNELFOCUS({name: text, no: channelNo}));
        onClickModal();
    }

    const onChangeHandler = (e) => {
        setText(e.target.value);
    }

    useEffect(() => {
      console.log(text);
  }, [text])

    const onChangeDescHandler = (e) => {
      setDescription(e.target.value);
    }

    function TabContent() {
        if (tab === 0) return <ChannelSetting_info 
            setText={setText} 
            channelName ={text} 
            onClickModal={onClickModal} 
            onChangeDescHandler={onChangeDescHandler} 
            description={description}
            onClickHandler={onClickHandler}
            onChangeValue={onChangeValue}/>
        else if (tab === 1) return <Channelsetting_set onClickModal={onClickModal} onClickHandler={onClickHandler} onChangeValue={onChangeValue}/>
      }

    // useEffect(() => {
    //   setText(channelName);
    // }, [channelName]);
    
    return (
        <>
        <Modal show={modalShow} onHide={onClickModal}>
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
        {/* <Nav.Item>
          <Nav.Link eventKey="link-2" onClick={() => setTab(2)}>
            Option 2
          </Nav.Link>
        </Nav.Item> */}
      </Nav>
      <TabContent />
      {/* <Modal.Footer>
            <Button variant="outline-dark" onClick={onClickModal} >
              취소
            </Button>
            <Button variant="outline-dark" onClick={onClickHandler} >
              변경사항 저장
            </Button>
        </Modal.Footer>  */}
      </Modal>
        </>
    );

    
}

export default ChannelSetting;