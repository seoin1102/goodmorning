import { Divider, Grid, List, ListItem, ListItemText } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { get } from '../../apis/Axios';
import CrewSetting from '../modal/Crew/CrewSetting';

function ChatHeader() {

    const user = JSON.parse(localStorage.getItem('authUser'));
    const userNo = user.no;

    const [crewModalIsOpen, setCrewModalIsOpen] = useState(false);

    

    const crewName = useSelector(state => {  
        return (state.focus.crewName)}, shallowEqual);
    
    const [users, setUsers] = useState([]);

    const initialUser = useCallback(async(userNo) => {
        const result = await get(`/user/email/${userNo}`);
        console.log("aaaaa",result);
        setUsers(() => [].concat(result));

    }, [users])

    const onClickCrewModal = useCallback(() => {
        setCrewModalIsOpen(prevCrewModalIsOpen => !prevCrewModalIsOpen);
        initialUser(userNo);
    }, [])

    const onClickExitModal = useCallback(() => {
        setCrewModalIsOpen(prevCrewModalIsOpen => !prevCrewModalIsOpen);
    }, [])

    return (
        <>
            <Grid container style={{ padding: '10px 30px 0px 20px', backgroundColor:'#f7f7fa', borderBottom:'solid 2px black' }}>
                <Grid item xs={12}>
                    <List>
                        <ListItem button key="RemySharp"
                            onClick={onClickCrewModal}>
                            <ListItemText> #{crewName} </ListItemText>
                        </ListItem>
                        <CrewSetting modalShow={crewModalIsOpen} onClickModal={onClickExitModal} users={users} crewName={crewName}/>
                    </List>
                    <Divider />
                </Grid>
            </Grid>
        </>
    );
}

export default ChatHeader;