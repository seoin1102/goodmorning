import axios from 'axios';
import {checkResponse, checkAuth, catchAuth } from './Fetch'

const authorization = localStorage.getItem('authorization');
const client = axios.create({baseURL: 'http://localhost:8080/api', headers: {'Authorization' : authorization}});


/**
 * axios GET(Read) 요청
 * @param {string} url api 서버 url [도메인 제외]
 * @returns 
 */
export const get = async (url) => {
    try {
        let response =  await client.get(url);
        checkAuth(response);
        return response.data.data;
    } catch (error) {
        console.error("Error >>", error);
        catchAuth(error);
    }    
}

export const getGit = async (url, data) => {
  try {
      let response =  await axios.post(url, data, {headers: {'Content-Type': 'application/json', 'Authorization' : authorization}});
      //let response =  await axios.get(`/git${url}`);
      //let response =  await axios.get(`https://github.com/shake-shack/goodmorning`);
    
      checkAuth(response);
      
      return response.data;
  } catch (error) {
      console.error("Error >>", error);
      catchAuth(error);
  }    
}

export const getJson = async (url, data) => {
    try {
        let response =  await client.get(url, data, {headers: {'Content-Type': 'application/json'}
    });
        return response.data;
    } catch (error) {
        console.error("Error >>", error);
    }    
}

/**
 * axios POST(Create) 요청
 * @param {string} url api 서버 url [도메인 제외]
 * @param {object} data 추가할 채널 or 크루 객체
 * @returns 
 */
export const post = async (url, data) => {
    try {
        
        let response = await client.post(url, data);
        return response.data;
    } catch (error) {
        console.error("Error >>", error);

    }
}

export const postJson = async (url, data) => {
  try {
      let response = await client.post(url, data, {headers: {'Content-Type': 'application/json'}
    });
      return response.data;
  } catch (error) {
      console.error("Error >>", error);

  }
}

export const postSignIn = async (url, data) => {
    try {
        let response = await client.post(url, data, {headers: {'Content-Type': 'application/json'}
      });
        return response;
    } catch (error) {
        console.error("Error >>", error);
  
    }
  }

export const postFile = async (url, data) => {
    try {
        let response = await client.post(url, data, {headers: {'Content-Type': 'multipart/form-data'}
      });
        return response.data;
    } catch (error) {
        console.error("Error >>", error);
  
    }
  }


export const putJson = async (url, data) => {
    try {
        let response = await client.put(url, data, { headers: {'Content-Type': 'application/json'}
      });
        return response.data;
    } catch (error) {
        console.error("Error >>", error);

    }
  }

export const put = async (url, data) => {
    try {
        let response = await client.put(url, data);
        return response.data;

    } catch (error) {
        console.error("Error >>", error);
    }
}

export const putUrl = async (url) => {
    try {
        let response = await client.put(url);
        return response.data;

    } catch (error) {
        console.error("Error >>", error);
    }
}

export const remove = async (url, data) => {
    try {
        let response = await client.delete(url,data);
        console.log(response);
        return response.data;

    } catch (error) {
        console.error("Error >>", error);
    }
}