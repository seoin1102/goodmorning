import axios from 'axios';
import {checkResponse, checkAuth, catchAuth } from './Fetch'





export const getHtml = async () => {
  try {
      let response =  await axios.get('/shake-shack');
      checkAuth(response);
      
      return response.data;
  } catch (error) {
      console.error("Error >>", error);
      catchAuth(error);
  }    
}