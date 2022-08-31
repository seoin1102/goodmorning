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

export const fetchGetResponse = async(url,methodType,headerType) => {
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
    headers: header
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

export async function projectDirectoryListdata(userNo){
    const data ={
        userNo: userNo
    }
    const response =  await fetchResponse('api/fileManagement/fileshareDirectory','post','jsonjsonHeader',JSON.stringify(data));
    const json = await checkResponse(response);
    return json.data.data;
};


export async function projectFileListdata(projectNo){

    const data ={
         projectNo: projectNo
    }

    const response =  await fetchResponse('/api/fileManagement/fileshareFile','post','jsonjsonHeader',JSON.stringify(data));
    const json = await checkResponse(response);
    
    return json.data.data;   
};


export const checkAuth = (response) =>{
    if(response.ok !== undefined){
        const json = checkResponse(response)
    }
    else {
    }
};

export const catchAuth = (error) =>{
    if(error.toString()=='인증이 되지 않았습니다.'){
        location.href="/signin"
    }
};

export const getLocalStorageAuthUser = () =>{

    if(!localStorage.getItem('authUser')){
        location.href="/signin"
    }else{
        return JSON.parse(localStorage.getItem('authUser'));
    }
};


export const addFile = async function(comment, file, projectNo,userNo,setPosts) {
    try {
        // Create FormData
        const formData = new FormData();
        formData.append('comment', comment);
        formData.append('file', file);
        formData.append('projectNo', projectNo);
        formData.append('userNo',userNo);
        const response = await fetchResponse('/api/fileManagement/upload','post','multipartHeader',formData);
        const json = await checkResponse(response);
        
        // 리랜더링(업데이트 해줘야함 나중에 추가 예정)
        //setImageList([json.data, ...imageList]);

    } catch (err) {
        console.error(err);
    }
};

export const delelteFile = async function(no) {
    try {

    } catch (err) {
        console.error(err);
    }
};


export const fileDownload = async function(fileName) {
    try {
        
        const response = await fetchResponse('/api/fileManagement/download/'+fileName,'post','multipartHeader',fileName);
        const json = await checkResponse(response);

        // 리랜더링(업데이트 해줘야함 나중에 추가 예정)
        //setImageList([json.data, ...imageList]);

        const fileUrl = json.data.url;
        let getfileName = json.data.originFileName;
        // getfileName = fileName.split("/");

        getfile(fileUrl,getfileName);

    } catch (err) {
        console.error(err);
    }
};

export const deleteFile = async function(url,userNo) {
    try {
        const data ={
            url: url,
            userNo:userNo
        }
        const response = await fetchResponse('/api/fileManagement/delete','post','jsonjsonHeader',JSON.stringify(data));
        const json = await checkResponse(response);

    } catch(err) {
        console.log(err.toString());
    }
  };







