import React, {Fragment, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {resetPw} from '../../redux/sign'
import ResetPw from './signItem/ResetPw'

function ResetPwContainer({callback}) {

    const { email } = useSelector(state => ({
        email: state.sign.email
      }));

    const dispatch = useDispatch();
    const [errormessage, seterrormessage] = useState("");
    

    const onResetPw=(email) =>{
        updatePw(email);
        return  dispatch(resetPw(email));
    }

    const updatePw = async function(email) {
        try {
            const data ={
                email: email
            }
        
          const response = await fetch('/api/user/resetPw', {
            method: 'put',
            headers: {
            'Content-Type': 'application/json',  
              'Accept': 'application/json'
            },
            body: JSON.stringify(data)
          });
    
          if(!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
          }

          const json = await response.json();

          if(json.result !== 'success') {
            throw new Error(`${json.message}`);  
          }

            callback("해당 메일로 임시 패스워드가 전송되었습니다.","/signin")
            //localStorage.setItem('authUser',JSON.stringify(json.data));
            seterrormessage('');

        } catch(err) {
          //console.log(typeof(err));
          seterrormessage(err.toString());
          //callback(err.toString(),"")
        }
      }


    return (
        <ResetPw
            email={email}
            callback={onResetPw}
            errormessage={errormessage}
        />
    );
}

export default ResetPwContainer;