import React, {Fragment,useState,useRef} from 'react';
import SignUpContainer from '../components/sign/SignUp'
import Modal from 'react-modal';

function SignUp(props) {

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
            <SignUpContainer callback={showModal}></SignUpContainer>
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
                      location.href=(modalUrl.url);
                      }}>확인</button>
                </div>
          </Modal>


        </Fragment>
    );
}

export default SignUp;