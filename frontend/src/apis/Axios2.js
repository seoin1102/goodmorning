import axios from 'axios';
import {checkResponse, checkAuth, catchAuth } from './Fetch'

const client = axios.create({baseURL: '/git'})

export const getHtml = async (url) => {
  try {
      let response =  await client.get(url);
      checkAuth(response);
      
      return response.data;
  } catch (error) {
      console.error("Error >>", error);
      catchAuth(error);
  }    
}