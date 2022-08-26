import React, {useState} from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function Status(props) {
  const [value, setValue] = useState();

  const handleChange = (event) => {
    setValue(event.target.value);
    props.setState({...props.state, status: event.target.value})

  };
  return (
    <>
      <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={value ?? "Todo"}
        onChange={handleChange}
      >
        <FormControlLabel value="Todo" control={<Radio />} label="진행전" />
        <FormControlLabel value="Doing" control={<Radio />} label="진행중" />
        <FormControlLabel value="Done" control={<Radio />} label="종료" />
        
      </RadioGroup>
    </FormControl>
    </>
  );
}
export default Status