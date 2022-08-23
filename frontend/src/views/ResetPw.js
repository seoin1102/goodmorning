import React, {Fragment,useState,useRef} from 'react';
import ResetPwContainer from '../components/sign/ResetPw'
import Modal from 'react-modal';
function ResetPw(props) {
    const [modalData, setModalData] = useState({isOpen: false});
    const [modalUrl, setModalUrl] = useState({url:'/'});
    Modal.setAppElement('body');

    const showModal = function (message,url) {
        setModalData({
            label: message,
            isOpen: true,
        });
        setModalUrl({
          url:url
        })
      }
    
    return (
        <Fragment>
            <ResetPwContainer callback={showModal}></ResetPwContainer>
            <Modal
                isOpen={modalData.isOpen}
                onRequestClose={() => setModalData({isOpen: false})}
                shouldCloseOnOverlayClick={true}
                className={'Modal'}
                overlayClassName={'Overlay'}
                style={{content: {width: 350}} }
                >
                <h1>info창</h1>
                <div className={'modal-dialog-buttons'} >
                        <label style={{color:"black"}}>{modalData.label || '테스트라벨'}</label>
                </div>
                <div>
                    <button onClick={() => { 
                      setModalData({isOpen: false});
                      if(modalUrl.url !=''){
                        location.href=(modalUrl.url);
                      }
                      }}>확인</button>
                </div>
          </Modal>
        </Fragment>
    );
}

export default ResetPw;