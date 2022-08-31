import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import moment from "moment";
import AddProject from "../modal/Calendar/AddProject"
import { NavLink } from "react-router-dom";
import { NavDropdown } from 'react-bootstrap';
import { setProject, updateProject, deleteProject } from "../../redux/project";
import {get, put, remove} from '../../apis/Axios';


const useFakeMutation = () => {
  return React.useCallback(
    (user) =>
      new Promise((resolve, reject) =>
        setTimeout(() => {
          if (user.projectName?.trim() === '') {
            reject();
          } else {
            resolve(user);
          }
        }, 200),
      ),
    [],
  );
};

function computeMutation(newRow, oldRow) {
  if (newRow.projectName !== oldRow.projectName) {
    return `프로젝트명이 '${oldRow.projectName}' 에서 '${newRow.projectName}으로'`;
  }
  if (newRow.start !== oldRow.start) {
    return `시작일시가 '${oldRow.start || ''}' 에서 '${newRow.start || ''}으로'`;
  }
  if (newRow.end !== oldRow.end) {
    return `종료일시가 '${oldRow.end || ''}' 에서 '${newRow.end || ''}으로'`;
  }
  if (newRow.description !== oldRow.description) {
    return `설명이 '${oldRow.description || ''}' 에서 '${newRow.description || ''}으로'`;
  }
  if (newRow.status !== oldRow.status) {
    return `상태가 '${oldRow.status || ''}' 에서 '${newRow.status || ''}으로'`;
  }
  return null;
}

export default function AskConfirmationBeforeSave(props) {
  const [show, setShow] = React.useState(false);
  const dispatch = useDispatch();

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const crewNo = useSelector(state => state.focus.crewNo, shallowEqual);
  const [selectionModel, setSelectionModel] = React.useState([]);


  const mutateRow = useFakeMutation();
  const noButtonRef = React.useRef(null);
  const [promiseArguments, setPromiseArguments] = React.useState(null);

  const [snackbar, setSnackbar] = React.useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const processRowUpdate = React.useCallback(
    (newRow, oldRow) =>
      new Promise((resolve, reject) => {
        const mutation = computeMutation(newRow, oldRow);
        if (mutation) {
          // Save the arguments to resolve or reject the promise later
          setPromiseArguments({ resolve, reject, newRow, oldRow });
        } else {
          resolve(oldRow); // Nothing was changed
        }
      }),
    [],
  );

  const handleNo = () => {
    const { oldRow, resolve } = promiseArguments;
    resolve(oldRow); // Resolve with the old row to not update the internal state
    setPromiseArguments(null);
  };

  const handleYes = async () => {
    const { newRow, oldRow, reject, resolve } = promiseArguments;

    try {
      // Make the HTTP request to save in the backend
      const response = await mutateRow(newRow);
      setSnackbar({ children: '성공적으로 저장됐습니다.', severity: 'success' });
      const projectId = response.id

      put(`/project/${projectId}`, {...response, start:moment(response.start).format('YYYY-MM-DD'),end: moment(response.end).format('YYYY-MM-DD'),crewNo:crewNo})
      dispatch(updateProject(projectId,{...response, start:moment(response.start).format('YYYY-MM-DD'),end: moment(response.end).format('YYYY-MM-DD'),crewNo:crewNo}));
      resolve(response);
      setPromiseArguments(null);

    } catch (error) {
      setSnackbar({ children: "값을 입력해주세요.", severity: 'error' });
      reject(oldRow);
      setPromiseArguments(null);
    }
  };

  const handleEntered = () => {
    // The `autoFocus` is not used because, if used, the same Enter that saves
    // the cell triggers "No". Instead, we manually focus the "No" button once
    // the dialog is fully open.
    // noButtonRef.current?.focus();
  };

  const handleDelete = () => {
    console.log(selectionModel)

    selectionModel.map((id)=>{
      remove(`/project/${id}`,  id)
      dispatch(deleteProject(id));
      

    })
  }

  const renderConfirmDialog = () => {
    if (!promiseArguments) {
      return null;
    }

    const { newRow, oldRow } = promiseArguments;
    const mutation = computeMutation(newRow, oldRow);

    return (
      <Dialog
        maxWidth="xs"
        TransitionProps={{ onEntered: handleEntered }}
        open={!!promiseArguments}
      >
        <DialogTitle>수정하시겠습니까?</DialogTitle>
        <DialogContent dividers>
          {`'네'를 선택하시면 ${mutation} 변경됩니다.`}
        </DialogContent>
        <DialogActions>
          <Button ref={noButtonRef} onClick={handleNo}>
            아니오
          </Button>
          <Button onClick={handleYes}>네</Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  return (
    <div style={{ height: 400, width: '100%' }}>

      <Button variant="primary" onClick={handleShow}>
            프로젝트 추가
      </Button><AddProject show={show} handleClose={handleClose}/> 
      <Button variant="primary"  onClick={handleDelete}>
            프로젝트 삭제
      </Button>
      <NavLink to={'/task'}>
        <Button >
          작업 설정
        </Button>
      </NavLink>
      
      {renderConfirmDialog()}
      <DataGrid
       checkboxSelection
       onSelectionModelChange={(newSelectionModel) => {
         setSelectionModel(newSelectionModel);
       }}
       selectionModel={selectionModel}
        rows={props.projectList}
        columns={columns}
        processRowUpdate={processRowUpdate}
        experimentalFeatures={{ newEditingApi: true }}
      />
      {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </div>
  );
}

const columns = [
  { field: 'id', headerName: 'no', width: 50},
  { field: 'projectName', headerName: '프로젝트 명', width: 140,editable: true},
  { field: 'start', headerName: '시작일시', type:'date', width: 150, editable: true},
  { field: 'end', headerName: '종료일시', type:'date', width: 150, editable: true},
  {
    field: 'description',
    headerName: '설명',
    type: 'string',
    width: 180,
    editable: true
  },
  {
    field: 'status',
    headerName: '상태',
    description: 'This column has a value getter and is not sortable.',
    type: 'singleSelect',
    valueOptions: ['진행전', '진행중', '종료'],
    sortable: false,
    width: 70,
    editable: true
  },
  

];

