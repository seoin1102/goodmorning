import React, {Fragment, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SignIn from './signItem/SignIn'
import {signin} from '../../redux/sign'
import axios from 'axios';
import qs from 'qs';

function SignContainer({callback}) {

    console.log("로그아웃됬는지 체크:" + localStorage.getItem('authUser'));

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
          
          // const response = await axios({
          //   url:'/api/user/signIn',
          //   method:'post',
          //   headers:{
          //     'Content-Type': 'application/x-www-form-urlencoded',  
          //     'Accept': 'application/json'
          //   },
          //   data: new URLSearchParams(data)
          // })

          if(!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
          }

          const json = await response.json();

          if(json.result !== 'success') {
            throw new Error(`${json.result} ${json.message}`);  
          }

            //callback("로그인이 성공적으로 되었습니다.","/")
            localStorage.setItem('authUser',JSON.stringify(json.data));
            //console.log("스토리지:" + localStorage.getItem('authUser'));
            //console.log("스토리지 로그인체크:" + localStorage.getItem('saveEmail'));
            location.href="/";
            
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
            callback={onSignIn}
            callbackCheckSaveEmailStatus={onChangeSaveEmailcheck}/>
       </Fragment>     
    );
}

export default SignContainer;