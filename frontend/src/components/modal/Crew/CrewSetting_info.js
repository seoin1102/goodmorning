import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { putJson } from '../../../apis/Axios';
import { setCREWFOCUS } from '../../../redux/focus';
import { updateCREW } from '../../../redux/crew';

function CrewSetting_info({onClickModal, crewName, setTab, crewNo}) {

    const [name, setName] = useState(crewName);
    
    const dispatch = useDispatch();

    const onClickHandler = async(crewName, crewNo) => {
      const updateCrew = JSON.stringify({
            no: crewNo,
            name: crewName,

        })
        const result = await putJson(`/crew/update`, updateCrew);
        if (result.data === 'success'){
        dispatch(setCREWFOCUS({name: crewName, no: crewNo}));
        console.log("!!!!!!!!!!!!!!!", crewNo, crewName)
        dispatch(updateCREW({no: crewNo, name: crewName}))
        }
        onClickModal();
    }

    return (
      <>
        <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="crewForm.name">
                  <Form.Label>크루 이름</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Crew Name"
                    autoFocus
                    defaultValue={crewName}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                <Button variant="outline-dark"  >
                    이 크루에서 나가기
                  </Button>
                  </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button 
              variant="outline-dark"  
              onClick={() => {onClickModal()
                              setTab(0)
                              }} >
            취소
          </Button>
          <Button variant="outline-dark" onClick={()=> onClickHandler(name,crewNo)} >
            변경사항 저장
          </Button>
      </Modal.Footer>
        
     </>
    );
}

export default CrewSetting_info;