import { Grid } from '@mui/material';
import React from 'react';
import SiteLayout from '../components/layout/SiteLayout';
import SearchResult from '../components/search/SearchResult';
import { useLocation } from "react-router-dom";
import { shallowEqual, useSelector } from 'react-redux';
import ChatHeader from "../components/chat/ChatHeader"

function SearchChat() {
    const location = useLocation();
    // const { state } = location;
    // const searchText = state.search;
    const chatList = useSelector(state => (state.chat), shallowEqual);

    return (
        <SiteLayout>
            <Grid item xs={10}>
            <ChatHeader/>
            <SearchResult chatList={chatList}/>
        </Grid>
        </SiteLayout>
    );
}

export default SearchChat;