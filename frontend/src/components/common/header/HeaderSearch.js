import React,{useState} from 'react';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import { borderRadius } from '@mui/system';
import { DAY_SIZE } from '@mui/x-date-pickers/internals/constants/dimensions';
import SearchResult from '../../search/SearchList';
import { setProject, deleteProject } from "../../../redux/project";
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import SearchIcon from '../../../assets/icons/search.svg';
import Autocomplete from '@mui/material/Autocomplete';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

function HeaderSearch(props) {
  const searchList = useSelector(state => (state.search), shallowEqual);
  const searchBox = searchList.map((e)=> (e.message))
  const set = new Set(searchBox)
  const searchKeyword = [...set]
  const [search, setSearch] =useState('')
  const projectList = useSelector((state) => state.project, shallowEqual);
  const dispatch = useDispatch();

  const projectName = (projectList != null?projectList.map((project)=> project.projectName):[])
  const test = [...searchKeyword,...projectName]
  const handleChange=((e)=>{
    if(e.target.value == 0){
      setSearch(e.target.innerText)}
    else{
      setSearch(e.target.value)
    }
  })
  const handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      return <NavLink to={"/search"}  state={{search:search}}/>
    }

  }

  const totalProject = React.useCallback(
    async (channelNo) => {
      const getProjects = await get(`/project/${channelNo}`);
      dispatch(setProject(getProjects));
    },
    [dispatch]
  );

  React.useEffect(()=>{
    totalProject
  },[totalProject])
  
  return (
      <Grid item xs={7}>
        <div style={{display:'flex' , alignItems:"center"}}>
          <List>

          {searchKeyword.length > 1 ? 
          <Autocomplete
              freeSolo
              value={search || ''}
              id="free-solo-demo"
              options={test}
              onChange={handleChange}
              sx={{ width: 332, backgroundColor: 'white' }}
              renderInput={(params) => 
              <TextField 
              value={search || ''}
              onChange={handleChange}
              fullWidth
              sx={{
                input: {
                    color: "black",
                    height: '100%',
                    width:'300px',
                    border: '2px solid white', 
                    borderRadius: '7px', 
                    backgroundColor: 'white'
                }
              }}
              {...params}
              label="검색" placeholder="검색어를 입력해주세요"/>}
            /> :
            <TextField 
              value={search || ''}
              onChange={handleChange}
              fullWidth
              label="검색" placeholder="검색어를 입력해주세요"
              sx={{
                input: {
                    color: "black",
                    height: '100%',
                    width:'300px',
                    border: '2px solid white', 
                    borderRadius: '7px', 
                    backgroundColor: 'white'
                }
              }}
              
              
            />}
              
              </List>
          <NavLink to={"/search"} state={{search:search}}  onKeyPress={handleKeyPress}>
          <Button className='searchbtn' variant="none" onClick={handleKeyPress} ><img src={SearchIcon} style={{height:'40px', border:'0px' }}/></Button> 
          </NavLink>
          
          </div>
          <Divider />
      </Grid>
  );
}

export default React.memo(HeaderSearch);