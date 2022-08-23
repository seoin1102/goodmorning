import React from 'react';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ReactModal from "react-modal";

ReactModal.setAppElement('body');

function HeaderItem({itemName, customStyle, onClickModal, children}) {
    
    return (
        <Grid item xs={2}>
            <List style={{background:'#3a4275'}}>
                <ListItem 
                    button key="RemySharp" 
                    style={customStyle}
                    onClick={onClickModal}
                    >
                    <ListItemText style={{fontStyle:'10em'}}>{itemName}</ListItemText>
                </ListItem>
                    {children}
            </List>
            <Divider/>
        </Grid>
    );
}

export default React.memo(HeaderItem);