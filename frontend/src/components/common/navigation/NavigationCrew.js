import React from 'react';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';

import NavigationItem from './NavigationItem';

// 많으면 화면 넘어가므로 스크롤 추가 해주기
function NavigationCrew({crewList}) {
    console.log(crewList)
    return (
    <>
        <List>
            <Grid item xs={12}>크루</Grid>
            {crewList.map((crew) => 
                <NavigationItem
                    key={crew.no}
                    navLink={"/chat/room"} 
                    crewName={crew.name} />
            )}
        </List>
        <Divider />
    </>
    );
}

export default React.memo(NavigationCrew);