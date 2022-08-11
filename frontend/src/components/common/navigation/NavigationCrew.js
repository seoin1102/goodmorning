import React from 'react';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import '../../../styles/scss/modal/modal.scss';
import NavigationItem from './NavigationItem';

// 많으면 화면 넘어가므로 스크롤 추가 해주기
export default function NavigationCrew({crewList}) {
    return (
    <>
        <List>
            <Grid item xs={12}>크루</Grid>
            {crewList.map((crew) => 
                <NavigationItem
                    key={crew.no}
                    navLink={"/chat/room"} 
                    crewName={crew.name} 
                    secondary={"online"} />
            )}
        </List>
        <Divider />
    </>
    );
}