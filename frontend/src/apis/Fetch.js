import axios from 'axios';

const formjsonHeader = {
    'Content-Type': 'application/x-www-form-urlencoded',  
    'Accept': 'application/json'
}

const jsonjsonHeader = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}
const multipartHeader = {
    'Accept': 'application/json'
}

/**
 * 
 * @param {*} url 보낼 url 
 * @param {*} methodType 메소드 타입
 * @param {*} headerType 헤더 타입 
 * @param {*} sendData 보낼 데이터
 * @returns 
 */
export const fetchResponse = async(url,methodType,headerType,sendData) => {
    let header='';
    switch(headerType){
        case "formjsonHeader":
            header = formjsonHeader;
            break;
        case "jsonjsonHeader":
            header = jsonjsonHeader;
            break;
        case "multipartHeader":
            header = multipartHeader;
            break;
    }

    return (await fetch(url, {
    method: methodType,
    headers: header,
    body: sendData
  }));
}

export const checkResponse = async(response) =>{
        if(!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }

        const json = await response.json();

        if(json.result !== 'success') {  
            throw new Error(`${json.message}`); 
        }

        return json;
}

export const getfile = async function(fileUrl,fileName) {
    try {
        axios({
            url: fileUrl,
            method: 'GET',
            responseType: 'blob'
        })
        .then((response) => {
            console.log(response.data)
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })        
    } catch (err) {
        console.error(err);
    }
};

export const checkAuth = (response) =>{
    console.log("여기까지 들어온지 테스트1 " + JSON.stringify(response.ok))
    if(response.ok !== undefined){
        console.log("여기까지 들어온지 테스트2 " + response)
        const json = checkResponse(response)
    }
    else {
        console.log("여기까지 들어온지 테스트3 " + response)
    }
}

export const catchAuth = (error) =>{
    if(error.toString()=='인증이 되지 않았습니다.'){
        console.log("테스트로그 나중에 삭제 "+error.toString());
        location.href="/signin"
    }
}

export const getLocalStorageAuthUser = () =>{

    if(!localStorage.getItem('authUser')){
        location.href="/signin"
    }else{
        return JSON.parse(localStorage.getItem('authUser'));
    }
} 


