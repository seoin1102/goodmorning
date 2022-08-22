import React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import '../../styles/css/SiteLayout.css'
import Header from '../common/Header';
import Navigation from '../common/Navigation';
// import Footer from './Footer';

function SiteLayout({children}) {

    return (
        <div>
            <Grid container component={Paper}>
                <Header />
                <Navigation/>
                {children}
            </Grid>
            {/* <Footer/> */}
        </div>
    );
}

export default SiteLayout;