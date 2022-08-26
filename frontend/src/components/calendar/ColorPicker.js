import React,{useState} from 'react';
import { CirclePicker   } from 'react-color';
import '../../styles/css/Calendar.css'

export default function ColorPicker(props) {
  const [state, setState] = useState({color:'#4caf50'})


  const handleChange = (color) => {
    props.setState({...props.state, color: color.hex})
    setState(color.hex)
    console.log({...props.state, color: color.hex})
    console.log("왜???")
    console.log(props.state)
    console.log("왜???")

  };

  return (
    <>
    <CirclePicker className='circle-picker' color={ state || '#4caf50'} onChange={ handleChange }/>
    </>
    
    )
  }
