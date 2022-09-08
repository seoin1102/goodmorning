import React, {Fragment, useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SignIn from './signItem/SignIn'
import {signin} from '../../redux/sign'
import { fetchResponse, checkResponse } from '../../apis/Fetch';
import { get, postJson, postSignIn } from '../../apis/Axios';
import jwt_decode from "jwt-decode";
function SignContainer() {


    const [errormessage, seterrormessage] = useState("");

    const onChangeSaveEmailcheck = (status) =>{
      setSaveEmailcheck(status);
    }

    const { email, passwd } = useSelector(state => ({
        email: state.sign.email,
        passwd: state.sign.passwd
     }));
    
    // console.log(email,passwd);
    
    const dispatch = useDispatch();
         
    const onSignIn=(email,passwd) =>{
        getSignIn(email,passwd);
        return  dispatch(signin(email,passwd));
    }

      const getSignIn = async function(getEmail,passwd) {
        try {
            const data ={
                email: getEmail,
                passwd: passwd
            }

            const response = await postSignIn('/user/signIn',data);
            const decoded = jwt_decode(response.headers.authorization);
          
            const {no, name, email, job, phoneNumber, profileUrl, signUpDate } = decoded;
            const userInfo = {no, name, email, job, phoneNumber, profileUrl, signUpDate };

            localStorage.setItem('authorization', response.headers.authorization );
            localStorage.setItem('authUser',JSON.stringify(userInfo));
            location.href="/";
            seterrormessage('');
            
        } catch(err) {
          seterrormessage(err.toString());
          console.log(err);
        }
      }

    return (
      <Fragment>
        <SignIn
            email={email}
            passwd={passwd}
            callback={onSignIn}
            callbackCheckSaveEmailStatus={onChangeSaveEmailcheck}
            errormessage={errormessage}/>
       </Fragment>     
    );
}

export default SignContainer;