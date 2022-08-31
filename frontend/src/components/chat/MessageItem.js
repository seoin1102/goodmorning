import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { TabContent } from 'react-bootstrap';
import '../../styles/css/msItem.css';
import '../../assets/fonts/font.css'
import hash2 from '../../assets/icons/user.png';
import { Avatar, ListItemIcon } from '@mui/material';
import { linkPreview } from '../../apis/LinkPreview';

function MessageItem({align, message, time, name}) {
    const test = async () => {
      const result =await linkPreview('/');
      console.log("aaaaaaaaaaaaaaaaaa", result)
    }
    useEffect(() => {
        test();
    }, [])

    return (
        <ListItem key="1" >
            <Grid container spacing={1}>
                <Grid item xs={0.5} >
                    <ListItemIcon sx={{padding: "7px 0 0 0"}}>
                    {/* <img src={hash2}/> */}
                        <Avatar alt={"null"} src={hash2} />
                    </ListItemIcon>
                </Grid>
                <Grid item xs={11.5} style={{width:'max-content', padding:'10px 50px 10px 30px', fontFamily:'SongMyung'}} >
                    <ListItemText align={align} style={{fontWeight:'bolder', fontFamily:'SongMyung'}} >{name}  {time}</ListItemText>
                    <ListItemText align={align} primary={message} sx={{}} ></ListItemText>

                </Grid>
            </Grid>
        </ListItem>
    );
}

export default React.memo(MessageItem);