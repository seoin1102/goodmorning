import React, { useCallback, useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { shallowEqual, useSelector } from 'react-redux';
import { getLocalStorageAuthUser, fetchResponse, checkResponse, updateProfileAndFindProfileurl } from '../../../apis/Fetch';
import EditProfile from './Profile';


function Profile({ modalShow, onClickModal }) {
  // const [name,setName] = useState("");
  const user = getLocalStorageAuthUser();
  const { name, job, phoneNumber } = user;
  const [profile, setProfile] = useState({
    name: name,
    job: job,
    phoneNumber: phoneNumber
  })
  const userNo = user.no;
  const [isInitial, setInitial] = useState(false);
  const [url, seturl] = useState('');


  useEffect(() => {
    (async () => {
      const profileUrl = await getProfileImg(userNo)
      seturl(profileUrl);
      setInitial(true)
    })();
  }, []);

  const getProfileImg = async function (userNo) {
    try {
      const data = {
        no: userNo
      }
      const response = await fetchResponse('/api/fileManagement/profileImg', 'post', 'jsonjsonHeader', JSON.stringify(data));
      const json = await checkResponse(response);
      console.log(json);
      return json.data.profileUrl;
    } catch (err) {
      console.log(err);
    }
  }

  const uploadcheck = async (file, userNo) => {
    const updateProfileUrl = await updateProfileAndFindProfileurl(file, userNo);
    seturl(updateProfileUrl);
  }

  const [editProfileModalShow, seteditProfileModalShow] = useState(false);
  const onClickeditProfileModal = useCallback(() => {
    seteditProfileModalShow(preveditProfileModalShow => !preveditProfileModalShow);

  }, [])

  return (
    <>
      {
        isInitial ?
      (<><Modal show={modalShow} onHide={onClickModal}>
            <Modal.Header closeButton>
              <Modal.Title>내 프로필</Modal.Title>
            </Modal.Header>
            <Form>
              <Modal.Body>

                <div style={{ textAlign: 'center' }}>
                  <img src={url} name='profileImg'></img>
                </div>

                <Form.Group className="mb-3" controlId="crewForm.name">
                  <Form.Label>{user.name}</Form.Label>
                </Form.Group>

                <Form.Group className="mb-3" controlId="crewForm.name">
                  <Form.Label>{user.email}</Form.Label>
                </Form.Group>

                <Form.Group className="mb-3" controlId="crewForm.name">
                  <Form.Label>{user.signUpDate ? user.signUpDate : '값이 없음'}</Form.Label>
                </Form.Group>

                <Form.Group className="mb-3" controlId="crewForm.name">
                  <Form.Label>{user.job ? user.job : '등록하지 않았습니다!'}</Form.Label>
                </Form.Group>


                <Form.Group className="mb-3" controlId="crewForm.name">
                  <Form.Label>{user.phoneNumber ? user.phoneNumber : '등록하지 않았습니다!'}</Form.Label>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="outline-dark" type="button" onClick={onClickModal}>
                  취소
                </Button>
                <Button variant="outline-dark" type="button" onClick={onClickeditProfileModal}>
                  프로필 편집
                </Button>

              </Modal.Footer>
            </Form>
          </Modal><EditProfile modalShow={editProfileModalShow} onClickModal={onClickeditProfileModal}
            user={user} profile={profile} setProfile={setProfile} /></>) 
                   : (null)}
      </>  
      );

}
export default Profile;