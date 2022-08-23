import { Divider, Grid, List, ListItem, ListItemText } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import CrewSetting from '../modal/Crew/CrewSetting';

function ChatHeader() {

    const [crewModalIsOpen, setCrewModalIsOpen] = useState(false);

    const onClickCrewModal = useCallback(() => {
        setCrewModalIsOpen(prevCrewModalIsOpen => !prevCrewModalIsOpen);
    }, [])

    const crewName = useSelector(state => {  
        return (state.focus.crewName)}, shallowEqual);
    
    return (
        <>
            <Grid container style={{ padding: '10px 30px 0px 20px', backgroundColor:'#f7f7fa', borderBottom:'solid 2px black' }}>
                <Grid item xs={12}>
                    <List>
                        <ListItem button key="RemySharp"
                            onClick={setCrewModalIsOpen}>
                            <ListItemText> #{crewName} </ListItemText>
                        </ListItem>
                        <CrewSetting modalShow={crewModalIsOpen} onClickModal={onClickCrewModal} />
                    </List>
                    <Divider />
                </Grid>
            </Grid>
        </>
    );
}

export default ChatHeader;