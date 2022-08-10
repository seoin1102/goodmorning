import React, { useEffect, useState } from 'react';
import { get } from './apis/Axios';
import { useSelector, useDispatch } from 'react-redux';
import { setCrew, addCrew, deleteCrew } from './redux/crew';

function App() {

    /**
     * 
     */
    const dispatch = useDispatch();

    /**
     * get state from redux store
     */
    const data = useSelector(state => (
      state.crew
    )) 

    const callback = async() => {
      const crews = await get('/chat/rooms');
      console.log("ttt", crews);
      dispatch(setCrew(crews));
    }
    useEffect(() => {
      callback();
    }, [])

    return (
        <div id={'App'}>
          <h1>Test~Test~Test~</h1>
          {data.map((t, index) => <h2 key={index}>{t.roomId}</h2>)}
        </div>
    );
}

export default App