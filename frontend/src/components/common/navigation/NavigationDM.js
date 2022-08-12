import React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import '../../../styles/scss/modal/modal.scss';
import NavigationItem from './NavigationItem';

// 데이터 받아오면 NavigationItem.map으로 반복문 실행해서 출력
function NavigationDM() {
    return (
    <List>
        <Grid item xs={12}>다이렉트 메시지</Grid>
        <NavigationItem  navLink={"/chat/room"} userName={"김현석"} secondary={"online"} />
        <NavigationItem  navLink={"/chat/room"} userName={"김서인"} secondary={"online"} />
        <NavigationItem  navLink={"/chat/room"} userName={"김휘민"} secondary={"online"} />
        <NavigationItem  navLink={"/"} userName={"최시창"} secondary={"online"} />
    </List>
    );
}

export default React.memo(NavigationDM);