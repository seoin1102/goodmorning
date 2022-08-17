import React from 'react';
import {useRoutes} from 'react-router';
import Main from "./views/Main";
import Chat from "./views/Chat";
import Channel from "./components/modal/Channel/AddChannel";
import Calendar from './views/Calendar';
import Reservation from './views/Reservation';
import Search from './views/Search';
import SaveMessage from './views/SaveMessage';

export default function App() {
    return useRoutes([
        {path:'/', element: <Main /> },
        {path:'chat/room', element: <Chat /> },
        {path:'modal/channel', element: <Channel />},
        {path:'calendar', element: <Calendar />},
        {path:'reservation', element: <Reservation />},
        {path:'search', element: <Search />},
        {path:'save', element: <SaveMessage />},
    ]);
}