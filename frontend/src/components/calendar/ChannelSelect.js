import React from "react";
import { useSelector,  shallowEqual } from "react-redux";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

export default function ChannelSelect(props) {
  const crewList = useSelector((state) => state.crew, shallowEqual);
  const onChange=(event, value)=>{
    event.preventDefault();
    const no = crewList.filter(crew => crew.name ==value)
    props.setClickedCrewName(value)
    props.setClickedCrewNo(no[0].no)
 
    console.log(props.clickedCrewNo)
}

  return (
    <Stack spacing={3} sx={{ width: 466 }}>
      <Autocomplete
        id="tags-outlined"
        options={crewList.map((option)=>option.name)}
        defaultValue={props.clickedCrewName == null? '': props.clickedCrewName}
        onChange={onChange}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="채널을 입력해주세요"
          />
        )}
      />
    </Stack>
  );
}
