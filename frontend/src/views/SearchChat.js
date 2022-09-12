import { Grid } from '@mui/material';
import React from 'react';
import SiteLayout from '../components/layout/SiteLayout';
import SearchResult from '../components/search/SearchResult';
import { useLocation } from "react-router-dom";
import { shallowEqual, useSelector } from 'react-redux';
import ChatHeader from "../components/chat/ChatHeader"

function SearchChat() {

    return (
        <>
        <SiteLayout>
            <Grid item xs={10}>
            <ChatHeader/>
            <SearchResult />
        </Grid>
        
        </SiteLayout>
        </>
    );
}

export default SearchChat;