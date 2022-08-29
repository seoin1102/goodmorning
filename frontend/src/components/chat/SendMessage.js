import React,{useState, useRef,useEffect} from 'react';
import Modal from "react-modal";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import { Button } from '@mui/material';
import FileUpload from '../modal/File/FileUpload'
import { NavLink } from 'react-bootstrap';
import { addFile,fileDownload } from '../../apis/Fetch';

function SendMessage({onChangeHandler, onClickHandler, text}) {

    const [modalIsOpen, setModalIsOpen] = useState(false);

    // modal click
    const onClickFileUploadModal = () => {
        setModalIsOpen(true)
    }
    
    const FileUploadModalIsOpen = (isOpenStatus) => {
        setModalIsOpen(isOpenStatus)
    }

    return (
        <div>
        <Grid container style={{ padding: '10px 30px 10px 20px'}}>
            <Grid item xs={11} style={{direction:'rtl'}}>
                <Button variant="outlined" component="label" onClick={onClickFileUploadModal}>
                    Upload  
                </Button>
                <Button variant="outlined" component="label" onClick={() => {
                    fileDownload("2022729111552688.jpg")}
                }>
                    임시다운로드 버튼  
                </Button>
            </Grid>
        </Grid>
        <Grid container style={{ padding: '0px 30px 10px 20px' }}>
            <Grid item xs={11}>
                <TextField
                  onChange={onChangeHandler}
                  id="outlined-basic-email" 
                  label="Type Something" 
                  fullWidth
                  onKeyDown={(e) => { if(e.key === 'Enter') onClickHandler() }}
                  value={text}
                  />
            </Grid>
            <Grid item xs={1} align="right">
                <Fab 
                  color="primary" 
                  aria-label="add"
                  onClick={onClickHandler}
                  >
                  {"보내기"}
                </Fab>
            </Grid>
        </Grid>
        <FileUpload modalShow={modalIsOpen} FileUploadModalIsOpenCallback={FileUploadModalIsOpen} >
            <></>
        </FileUpload>
        </div>
    );
}

export default React.memo(SendMessage);