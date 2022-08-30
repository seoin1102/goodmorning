import React from "react";
import { useSelector,  shallowEqual } from "react-redux";
import project from "../../redux/project";


import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

export default function ProjectSelect(props) {
  const projectList = useSelector((state) => state.project, shallowEqual);

  const onChange=(event, value)=>{
    event.preventDefault();
    const no = projectList.filter(project => project.projectName ==value)
    props.setClickedProject(value)
    props.setClickedProjectNo(no[0].id)
  

    // props.setState({...props.state, projectName:value, projectNo:no[0].id})
}

  return (
    <Stack spacing={3} sx={{ width: 500 }}>
      <Autocomplete
        id="tags-outlined"
        options={projectList.map((option)=>option.projectName)}
        // getOptionLabel={(option) => option.projectName}
        // isOptionEqualToValue={(option, defaultValue) =>props.clickedProject&&String.toString(option.projectName) == String.toString(defaultValue.projectName)}        
        // value={inputValue}
        defaultValue={props.state == null? '': props.state.projectName}
        onChange={onChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="프로젝트"
            placeholder="프로젝트를 입력해주세요"
          />
        )}
      />
    </Stack>
  );
}
