import React, {Fragment} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {resetPw} from '../../redux/sign'
import ResetPw from './signItem/ResetPw'

function ResetPwContainer({callback}) {

    const { email } = useSelector(state => ({
        email: state.sign.email
      }));

    const dispatch = useDispatch();


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
          const message = json.message;

          if(json.result !== 'success') {
            throw new Error(`${json.result} ${json.message}`);  
          }

            callback(message,"/signin")
            console.log(json.data);
            localStorage.setItem('authUser',JSON.stringify(json.data));
            console.log("스토리지:" + localStorage.getItem('authUser'));

        } catch(err) {
          //console.log(typeof(err));
          callback(err.toString(),"")

        }
      }


    return (
        <ResetPw
            email={email}
            callback={onResetPw}
        />
    );
}

export default ResetPwContainer;