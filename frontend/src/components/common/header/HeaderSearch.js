import React,{useState} from 'react';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import { borderRadius } from '@mui/system';
import { DAY_SIZE } from '@mui/x-date-pickers/internals/constants/dimensions';
import SearchResult from '../../search/SearchList';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import SearchIcon from '../../../assets/icons/search.svg';


function HeaderSearch(props) {
  const [search, setSearch] =useState()

  const handleChange=((e)=>{
    setSearch(e.target.value)
  })

  const handleKeyPress = e => {
    if(e.key === 'Enter') {
      e.preventDefault();

      console.log(search)
      props.setSearch(search)
      return (<NavLink to={"/search"}  state={{search:search}}/>
    )}
    

  }

  return (
      <Grid item xs={7}>
        <div style={{display:'flex' , alignItems:"center"}}>

          <List>
              <TextField 
              id="outlined-basic-email" 
              label=""
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              value={search || ''}
              placeholder="검색어를 입력해주세요"
              sx={{
                input: {
                    color: "black",
                    height: '20px',
                    width:'500px',
                    border: '2px solid white', 
                    borderRadius: '7px', 
                    backgroundColor: 'white'
                }
              }}
              fullWidth
               />
              </List>
          <NavLink to={"/search"} state={{search:search}}>
          <Button className='searchbtn' variant="none" onClick={handleKeyPress}><img src={SearchIcon} style={{height:'40px', border:'0px' }}/></Button> 
          </NavLink>
          
          </div>
          <Divider />
      </Grid>
  );
}

export default React.memo(HeaderSearch);