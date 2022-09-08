import { Avatar, ListItemIcon } from '@mui/material';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import React, { useEffect, useState } from 'react';
import '../../assets/fonts/font.css';
import '../../styles/css/msItem.css';

function GitMessageItem({align, message, time, name, url}) {
    const [messageItem, setMessageItem] = useState({
        eventType: '',
        gitUser: '',
        gitMessage: '',
        branch: '',
        after: ''
    });

    useEffect(() => {
        const messageItemArray = name.split('#$#');
        let branch;

        if(messageItemArray[0] === 'push')
            branch = messageItemArray[3].split('/')[2];
        else
            branch = messageItemArray[3];

        setMessageItem((prevMessageItem) => ({
            ...prevMessageItem, 
            eventType: messageItemArray[0], 
            gitUser: messageItemArray[1],
            gitMessage: messageItemArray[2],
            branch: branch,
            after: messageItemArray[4]
          }))
    }, [name]);

    useEffect(() => {
        console.log(messageItem);
    }, [messageItem])
    
  console.log("깃 허브 메시지 ", message)
  return (
        <ListItem key="1" >
            <Grid container spacing={1}>
                <Grid item xs={0.5} >
                    <ListItemIcon sx={{padding: "7px 0 0 0"}}>
                        <Avatar alt={"null"} src={url} />
                    </ListItemIcon>
                    <div style={{height: '100px'}}></div>
                </Grid>
                <Grid item xs={11.5} style={{width:'max-content', padding:'10px 50px 10px 30px', borderColor: 'black'}} >
                    <Grid container spacing={1} >
                        <Grid item xs={12} >
                            <ListItemText align={align} style={{fontWeight:'bolder'}} >{name}  {time}</ListItemText>
                        </Grid>
                        <Grid item xs={0.005} sx={{backgroundColor: 'black', borderRadius: '10px', borderWidth: '1px', padding: '0'}}>
                            <div style={{height: '65px', padding: '0'}}></div>
                        </Grid>
                        <Grid item xs={11.92} >
                            <Grid item xs={12}>
                                <ListItemText align={align} primary={'hwimin-kim'} sx={{fontFamily:'SUIT-Medium', padding: '0 0 0 10px'}} ></ListItemText>
                            </Grid>
                            <Grid item xs={12} sx={{display: 'flex'}}>      
                                <div style={{padding: '0 0 0 10px', margin: '0 0 8px 0'}}>{`2 new commit pushed to`}</div>
                                <div>&nbsp;</div>
                                <div style={{margin: '0 0 8px 0', backgroundColor: '#e8ebed', border: '1px solid #E1E1E9', color: 'red', borderRadius: '5px'}}>{`master`}</div>    
                            </Grid>
                            <Grid item xs={12} sx={{margin: '0px'}}>
                                <div style={{display: 'flex', justifyContent: 'center'}}>
                                    <Avatar alt={"null"} src={url} sx={{width: '25px', height: '25px', margin: '0 5px 0 10px', verticalAlign: 'middle'}}/>
                                    <ListItemText align={align} primary={'goodmorning'}  sx={{fontFamily:'SUIT-Medium'}}/>  
                                </div>                          
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </ListItem>
    );
}

export default React.memo(GitMessageItem);