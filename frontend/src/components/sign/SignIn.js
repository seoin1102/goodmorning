import React, {Fragment, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SignIn from './signItem/SignIn'
import {signin} from '../../redux/sign'


function SignContainer({callback}) {

  console.log("스토리지:" + localStorage.getItem('authUser'));
    const [saveEmailcheck, setSaveEmailcheck] = useState("no");

    const onChangeSaveEmailcheck = (status) =>{
      setSaveEmailcheck(status);
      console.log(status);
    }
    const { email, passwd } = useSelector(state => ({
        email: state.sign.email,
        passwd: state.sign.passwd
      }));


    const dispatch = useDispatch();
         
    const onSignIn=(email,passwd) =>{
        getSignIn(email,passwd);
        return  dispatch(signin(email,passwd));
    }
    
    const checksaveId=(checkstate) =>{
      
    }
      const getSignIn = async function(email,passwd) {
        try {
            const data ={
                email: email,
                passwd: passwd
            }

        //console.log("테스트1212:" + Object.keys(data).map(key => key + '=' + data[key]).join('&'))
        
          const response = await fetch('/api/user/signIn', {
            method: 'post',
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',  
              'Accept': 'application/json'
            },
            body: new URLSearchParams(data)
          });
    
          if(!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
          }

          const json = await response.json();

          if(json.result !== 'success') {
            throw new Error(`${json.result} ${json.message}`);  
          }
            callback("로그인이 완료되었습니다","/")
            //alert("성공");
            console.log(json.data);
            if(saveEmailcheck==='yes'){
              localStorage.setItem('saveEmail',email)
            }
            localStorage.setItem('authUser',JSON.stringify(json.data));
            console.log("스토리지:" + localStorage.getItem('authUser'));
            console.log("스토리지 로그인체크:" + localStorage.getItem('saveEmail'));
            //location.href="/";
            
        } catch(err) {
          console.log(typeof(err));
          //alert(err);
          callback(err.toString(),"/signin")
        }
      }


    return (
      <Fragment>
        <SignIn
            email={email}
            passwd={passwd}
            saveEmailcheck ={saveEmailcheck}
            callback={onSignIn}
            callbackCheckSaveEmailStatus={onChangeSaveEmailcheck}/>
       </Fragment>     
    );
}

export default SignContainer;