import { Divider, Grid, List, ListItem, ListItemText } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { get } from '../../apis/Axios';
import CrewSetting from '../modal/Crew/CrewSetting';

function ChatHeader() {

    const user = JSON.parse(localStorage.getItem('authUser'));
    const userNo = user.no;

    const [crewModalIsOpen, setCrewModalIsOpen] = useState(false);
    const {crewNo, crewName, channelNo} = useSelector(state => state.focus);
    const [users, setUsers] = useState([]);


    const onClickCrewModal = useCallback(() => {
        setCrewModalIsOpen(prevCrewModalIsOpen => !prevCrewModalIsOpen);
        initialUser();
    }, [channelNo, crewNo])

    const onClickExitModal = useCallback(() => {
        setCrewModalIsOpen(prevCrewModalIsOpen => !prevCrewModalIsOpen);
    }, [])

    const initialUser = useCallback(async() => {
        const result = await get(`/user/email/${channelNo}/${crewNo}`);
        console.log("aaaaa",result);
        setUsers(() => [].concat(result));

    }, [users, channelNo, crewNo])
    return (
        <>
            <Grid container style={{ padding: '0px 30px -10px 20px', backgroundColor:'#f7f7fa', borderBottom:'solid 2px black' }}>
                <Grid item xs={12}>
                    <List style={{ padding: '-8px auto'}}>
                        <ListItem button key="RemySharp"
                            onClick={onClickCrewModal}>
                            <ListItemText> #{crewName} </ListItemText>
                        </ListItem>
                        <CrewSetting modalShow={crewModalIsOpen} onClickModal={onClickExitModal} users={users} crewName={crewName} channelNo={channelNo} crewNo={crewNo}/>
                    </List>
                    <Divider />
                </Grid>
            </Grid>
        </>
    );
}

export default ChatHeader;