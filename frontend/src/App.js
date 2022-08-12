import React from 'react';
import {useRoutes} from 'react-router';
import Main from "./views/Main";
import Chat from "./views/Chat";
import Channel from "./components/modal/AddChannel";

export default function App() {
    return useRoutes([
        {path:'/', element: <Main /> },
        {path:'chat/room', element: <Chat /> },
        {path:'modal/channel', element: <Channel />}
    ]);
}