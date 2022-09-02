import { Box, Grid, Link, ListItem, ListItemText } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { linkPreview } from '../../apis/LinkPreview';
import  '../../styles/css/textBox.css';

function SendPreviewMessage({message}) {
    const [git, setGit] = useState(null);

    const test = async () => {
      const data = JSON.stringify({gitId: `shake-shack`, projectName:``})
      const a = await linkPreview(`/html/github`, data);
      setGit(a);
    }

    useEffect(() => {
        test();
    }, [])

  const t = () => {
    if(!!git) {
    return <>
              {/* <ListItem key="1" >
                  <Grid container spacing={1}>
                      <Grid item xs={3} >
                      <Link href={git.url} underline={'none'}>
                      <ListItemText align={null} primary={git.url} />
                      </Link>
                      </Grid>
                  </Grid>
                
              </ListItem> */}
              <ListItem>
              
                  <Grid container spacing={0} >
                      <Grid item xs={1.4} sx={{borderColor: '#E1E8ED', borderStyle: 'solid', borderWidth: '2px 0px', backgroundColor: '#FFFFFF'}}>
                          <Link href={git.url}  target="_blank" underline={'none'} color="inherit">
                          <Box
                              component="img"
                              sx={{
                                height: 175,
                                width: 180,
                                maxHeight: { xs: 175, md: 175 },
                                maxWidth: { xs: 180, md: 180 },
                              }}
                              alt={`${git["image:alt"]}`}
                              src={`${git.image}`}
                              />
                              </Link>
                      </Grid>

                      <Grid item xs={4} sx={{borderColor: '#E1E8ED', borderStyle: 'solid', borderWidth: '2px 4px 2px 0px', backgroundColor: '#FFFFFF'}}>
                          <Grid container spacing={0} >
                              <Grid item xs={12} sx={{verticalAlign:'middle'}}>
                              <ListItemText
                                  className={'ellipsis1'}
                                  align={"left"} 
                                  primaryTypographyProps={{
                                      fontWeight:'bold',
                                      fontSize:'27px', 
                                      fontFamily:'SongMyung',
                                      lineHeight: '35px',
                                      }} 
                                  style={{height: '60px', margin: '0',  padding: '9px 9px 0'}}>
                                  {git.title}
                              </ListItemText>
                              </Grid>
                              <Grid item xs={12}>
                              <ListItemText 
                                  className={'ellipsis2'}
                                  align={"left"} 
                                  primaryTypographyProps={{
                                        fontWeight:'normal', 
                                        fontSize:'22px', 
                                        fontFamily:'SongMyung',
                                        lineHeight: '29px'
                                        }} 
                                  style={{height: '70px', margin: '0', padding: '5px 9px'}}
                                  >
                                  {git.description}
                              </ListItemText>
                              </Grid>
                              <Grid item xs={12}>
                              <ListItemText
                                  className={'ellipsis1'}
                                  align={"left"}
                                  primaryTypographyProps={{
                                        fontWeight:'normal', 
                                        fontSize:'17px', 
                                        fontFamily:'SongMyung'
                                        }} 
                                  style={{height: '45px', margin: '0', padding: '9px'}}>
                                  {git.site_name}
                              </ListItemText>
                              </Grid>
                          </Grid>                                              
                      </Grid>

                      <Grid item xs={6.6} />

                  </Grid>
                  
              </ListItem>
          </>
    }
  }

  return (
    t()
  );
}

export default SendPreviewMessage;