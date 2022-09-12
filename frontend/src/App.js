import React, { useEffect } from 'react';
import {useRoutes} from 'react-router';
import Main from "./views/Main";
import Chat from "./views/Chat";
import Channel from "./components/modal/Channel/AddChannel";
import Project from './views/Project';
import Task from './views/Task';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import ResetPw from './views/ResetPw';
import FileShare from './views/FileShare';
import Reservation from './views/Reservation';
import Search from './views/Search';
import SearchChat from './views/SearchChat'
import SaveMessage from './views/SaveMessage';

export default function App() {
   
    return useRoutes([
        {path:'/', element: <Chat/> },
        {path:'chat/room', element: <Chat /> },
        {path:'modal/channel', element: <Channel />},
        {path:'fileshare',element:<FileShare/>},
        {path:'project', element: <Project />},
        {path:'task', element: <Task />},
        {path:'signin',element:<SignIn/>},
        {path:'signup',element:<SignUp/>},
        {path:'resetpw',element:<ResetPw/>},
        {path:'reservation', element: <Reservation />},
        {path:'search', element: <Search />},
        {path:'searchresult', element: <SearchChat />},
        {path:'save', element: <SaveMessage />},
    ]);
    
}