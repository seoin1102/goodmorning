import { Divider, Grid, List, ListItem, ListItemText } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { get } from '../../apis/Axios';
import { getLocalStorageAuthUser } from '../../apis/Fetch';
import CrewSetting from '../modal/Crew/CrewSetting';

function ChatHeader() {

    const user = getLocalStorageAuthUser();
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
        setUsers(() => [].concat(result));
    }, [users, channelNo, crewNo])
    
    return (
        <>
            <Grid container style={{height:'52px', backgroundColor:'#f7f7fa', borderBottom:'solid 1px #555555'}}>
                <Grid item xs={12}>
                    <List style={{ padding: '-20px auto'}}>
                        <ListItem button key="RemySharp"
                            onClick={onClickCrewModal}
                            style={{padding: '2px 0px 50px 10px'}} 
                            >
                            <ListItemText>{`# ${crewName}`} </ListItemText>
                        </ListItem>
                        <CrewSetting modalShow={crewModalIsOpen} onClickModal={onClickExitModal} 
                                    users={users} crewName={crewName} 
                                    channelNo={channelNo} crewNo={crewNo} 
                                    initialUser={initialUser} userNo={userNo}/>
                    </List>
                    <Divider />
                </Grid>
            </Grid>
        </>
    );
}

export default ChatHeader;