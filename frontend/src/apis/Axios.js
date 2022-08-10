import axios from 'axios';

const url = {
  localDev: process.env.REACT_APP_LOCAL_DEV_API_URL,
  localProd: process.env.REACT_APP_LOCAL_PROD_API_URL,
  serverDev: process.env.REACT_APP_SERVER_DEV_API_URL,
  serverProd: process.env.REACT_APP_SERVER_PROD_API_URL
}

const client = axios.create({baseURL: url.localDev})

/**
 * axios GET(Read) 요청
 * @param {string} url api 서버 url [도메인 제외]
 * @returns 
 */
export const get = async (url) => {
    try {
        let response =  await client.get(url);
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
        let response = await axios.post(url, data);
        return response.data;
    } catch (error) {
        console.error("Error >>", error);
    }
}