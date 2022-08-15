import React from 'react';
import {useRoutes} from 'react-router';
import Main from "./views/Main";
import Chat from "./views/Chat";
import Channel from "./components/modal/AddChannel";
import Calendar from './views/Calendar';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import ResetPw from './views/ResetPw';

export default function App() {
    return useRoutes([
        {path:'/', element: <Main /> },
        {path:'chat/room', element: <Chat /> },
        {path:'modal/channel', element: <Channel />},
        {path:'calendar', element: <Calendar />},
        {path:'/signin',element:<SignIn/>},
        {path:'/signup',element:<SignUp/>},
        {path:'/resetpw',element:<ResetPw/>}

    ]);
}