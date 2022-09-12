import React,{useState, useRef,useEffect} from 'react';
import Modal from "react-modal";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import { Button } from '@mui/material';
import FileUpload from '../modal/File/FileUpload'
import { NavLink } from 'react-bootstrap';
import { addFile,fileDownload } from '../../apis/Fetch';
import { useSelector, useDispatch } from 'react-redux';
import send2 from '../../assets/icons/send2.svg';

function SendMessage({onChangeHandler, onClickHandler, text, publishFileUpload}) {

    const [modalIsOpen, setModalIsOpen] = useState(false);


    const uploadcheck = async (comment, file, projectNo,userNo)=> {

        const fileUrl = await addFile(comment, file, projectNo,userNo);
        console.log("=====>",fileUrl);
        return fileUrl.data.url
        //dispatch(fileFileData(FileListdata));        
    }

    // modal click
    const onClickFileUploadModal = () => {
        setModalIsOpen(true)
    }
    
    const FileUploadModalIsOpen = (isOpenStatus) => {
        setModalIsOpen(isOpenStatus)
    }

    return (
        <>
        <Grid container style={{ padding: '10px 30px 10px 20px'}} sx={{backgroundColor:'#f7f7fa'}}>
            <Grid item xs={11} style={{direction:'rtl'}}>
                <Button style={{margin:'10px', color:'#34d6ce',backgroundColor:'#eef2f8', border:'white'}} variant="outlined" component="label" onClick={onClickFileUploadModal}>
                    업로드  
                </Button>
            </Grid>
        </Grid>
        <Grid container style={{ padding: '0px 30px 10px 20px' }}sx={{backgroundColor:'#f7f7fa'}}>
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
            <Grid item xs={1} align="center">
                <Fab 
                  sx={{backgroundColor: '#34d6ce'}}
                
                  aria-label="add"
                  onClick={onClickHandler}
                  >
                  <img src={send2}/>
                </Fab>
            </Grid>
        </Grid>

        <FileUpload 
            modalShow={modalIsOpen} 
            FileUploadModalIsOpenCallback={FileUploadModalIsOpen} 
            uploadcheck={uploadcheck} 
            publishFileUpload={publishFileUpload}
            type='chat'/>
        </>
    );
}

export default React.memo(SendMessage);