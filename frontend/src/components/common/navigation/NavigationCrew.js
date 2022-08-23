import React from 'react';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import NavigationItem from './NavigationItem';

// 많으면 화면 넘어가므로 스크롤 추가 해주기
function NavigationCrew({crewList,onClickCrew}) {

    return (
    <>
        <Grid item xs={12} style={{fontSize:'20px', padding:'10px', fontStyle:'bold',borderTop:'solid 1.5px white', borderBottom:'solid 1.5px white',color:'white'}}>크루</Grid>
        <List style={{height: '300px', overflow: 'auto'}}>
            {crewList.map((crew, index) => 
                <NavigationItem
                    key={index}
                    navLink={"/chat/room"}
                    crewName={crew.name}
                    crewNo={crew.no}
                    onClickCrew={onClickCrew} />

            )}
        </List>
        <Divider />
    </>
    );
}

export default React.memo(NavigationCrew);