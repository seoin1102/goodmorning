import React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';

import NavigationItem from './NavigationItem';

// 데이터 받아오면 NavigationItem.map으로 반복문 실행해서 출력
function NavigationDM() {
    return (
        <>
        <Grid item xs={12}>다이렉트 메시지</Grid>
        
    <List style={{height: '250px', overflow: 'auto'}}>
        
        <NavigationItem  navLink={"/chat/room"} crewName={"김현석"} secondary={"online"} />
        <NavigationItem  navLink={"/chat/room"} crewName={"김서인"} secondary={"online"} />
        <NavigationItem  navLink={"/chat/room"} crewName={"김휘민"} secondary={"online"} />
        <NavigationItem  navLink={"/"} crewName={"최시창"} secondary={"online"} />
    </List>
    </>
    );
}

export default React.memo(NavigationDM);