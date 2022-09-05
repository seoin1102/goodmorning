import React, {Fragment, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SignIn from './signItem/SignIn'
import {signin} from '../../redux/sign'
import axios from 'axios';
import qs from 'qs';
import { fetchResponse, checkResponse } from '../../apis/Fetch';
function SignContainer() {


    const [errormessage, seterrormessage] = useState("");

    const onChangeSaveEmailcheck = (status) =>{
      setSaveEmailcheck(status);
    }

    const { email, passwd } = useSelector(state => ({
        email: state.sign.email,
        passwd: state.sign.passwd
     }));
    
    console.log(email,passwd);
    
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

            const response = await fetchResponse('/api/user/signIn','post','formjsonHeader',new URLSearchParams(data));
            const json = await checkResponse(response);
              
            localStorage.setItem('authUser',JSON.stringify(json.data));
            location.href="/";
            seterrormessage('');
        } catch(err) {
          seterrormessage(err.toString());
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