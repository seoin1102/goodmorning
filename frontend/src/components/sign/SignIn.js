import React, {Fragment, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SignIn from './signItem/SignIn'
import {signin} from '../../redux/sign'


function SignContainer({callback}) {

    console.log("로그아웃됬는지 체크:" + localStorage.getItem('authUser'));
    const [saveEmailcheck, setSaveEmailcheck] = useState("no");


    const onChangeSaveEmailcheck = (status) =>{
      setSaveEmailcheck(status);
      console.log(status);
    }

    const onChangeEmailInput = (email) => {
      dispatch(signin(email));
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
          const message = json.message;

          if(json.result !== 'success') {
            throw new Error(`${json.result} ${json.message}`);  
          }

            callback(message,"/")
            if(saveEmailcheck==='yes'){
              localStorage.setItem('saveEmail',email)
            }
            localStorage.setItem('authUser',JSON.stringify(json.data));
            console.log("스토리지:" + localStorage.getItem('authUser'));
            console.log("스토리지 로그인체크:" + localStorage.getItem('saveEmail'));
            //location.href="/";
            
        } catch(err) {
          //alert(err);
          callback(err.toString(),"")
        }
      }


    return (
      <Fragment>
        <SignIn
            email={email}
            passwd={passwd}
            saveEmailcheck ={saveEmailcheck}
            callback={onSignIn}
            callbackCheckSaveEmailStatus={onChangeSaveEmailcheck}
            callbackonChangeEmailInput={onChangeEmailInput}/>

       </Fragment>     
    );
}

export default SignContainer;