import React,{useState, Fragment} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SignUp from './signItem/SignUp'
import {signup} from '../../redux/sign'


function SignContainer({callback}) {

    const [errormessage, seterrormessage] = useState("");

    const { email, name, passwd } = useSelector(state => ({
        email: state.sign.email,
        name: state.sign.name,
        passwd: state.sign.passwd
      }));


    const dispatch = useDispatch();
         
    const onSignUp = (email,name,passwd) => {
        insertSignUp(email,name,passwd);
        return dispatch(signup(email,name,passwd));
    };


    const insertSignUp = async function(email,name,passwd) {
        try {
            const data ={
                email: email,
                name: name,
                passwd: passwd
            }
          const response = await fetch('/api/user/signUp', {
            method: 'post',
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
            //throw new Error(`${json.result} ${json.message}`);  
            throw new Error(`${json.message}`);  
          }
            callback("회원가입 되었습니다. 해당 이메일로 확인 메일이 전송되었습니다.","/signin");
            //alert("회원가입 되었습니다. 해당 이메일로 확인 메일이 전송되었습니다.")
            //location.href="/";
            seterrormessage('');
        } catch(err) {
          //alert(err);
          //callback(err.toString(),"");
          seterrormessage(err.toString());
        }
      }

    return (
      <Fragment>
        <SignUp
            email={email}
            name={name}
            passwd={passwd}
            callback={onSignUp}
            errormessage={errormessage}/>
       </Fragment>     
    );
}

export default SignContainer;