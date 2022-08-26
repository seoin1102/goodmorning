import React, { useState, useEffect , memo} from "react";
import PropTypes, { element } from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import project from "../../redux/project";
import task from "../../redux/task";
import moment from "moment";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? '△'  : '▽'}
          </IconButton>
        </TableCell>

        <TableCell component="th" scope="row">
          {row.projectName}
        </TableCell>
        <TableCell align="right">{row.start}</TableCell>
        <TableCell align="right">{row.end}</TableCell>
        <TableCell align="right">{row.description}</TableCell>
        <TableCell align="right">{row.status}</TableCell> 
        <TableCell component="th" scope="row">
          {row.title}
        </TableCell>
        
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                작업 목록
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>작업명</TableCell>
                    <TableCell>담당자</TableCell>
                    <TableCell>시작일시</TableCell>
                    <TableCell>종료일시</TableCell>
                    <TableCell>상태</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.task &&row.task.map((historyRow) => (
                    <TableRow key={historyRow.id}>
                      <TableCell component="th" scope="row">
                        {historyRow.title}
                      </TableCell>
                      <TableCell>{historyRow.userName}</TableCell>
                      <TableCell>{historyRow.start}</TableCell>
                      <TableCell>{historyRow.end}</TableCell>
                      <TableCell>{historyRow.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}



export default function CollapsibleTable(props) {
  const projectList = useSelector((state) => state.project, shallowEqual);
  const taskList = useSelector((state) => state.task, shallowEqual);
  const thisYear = moment(props.date).format('YYYY');
  const lastYear = (moment(props.date).subtract(1, 'year').format('YYYY'))
  const nextYear = (moment(props.date).add(1, 'year').format('YYYY'))

  const filterdList = projectList.map(project=> {if(moment(project.start).format('YYYY') == thisYear){return project} }).filter(element=>element)
  const nextYearList = projectList.map(project=> {if(moment(project.start).format('YYYY') == nextYear){return project} }).filter(element=>element)

//   for(let i=0; i < filterdList.length; i++){
//     const tasks = []
//     for(let j=0; j <  taskList.length; j++){
//       if(filterdList[i].no==taskList[j].projectNo){
//         tasks.push(taskList[j])
//         filterdList[i].task= tasks
//       }   
//     }
//   }
// console.log(filterdList)
//   for(let i=0; i < nextYearList.length; i++){
//     const tasks = []
//     for(let j=0; j <  taskList.length; j++){
//       if(nextYearList[i].no==taskList[j].projectNo){
//         tasks.push(taskList[j])
//         nextYearList[i].task= tasks
//       }   
//     }
//   }

  return (
    <>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" >
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>프로젝트 명</TableCell>
            <TableCell align="right">시작일시</TableCell>
            <TableCell align="right">종료일시</TableCell>
            <TableCell align="right">설명</TableCell>
            <TableCell align="right">상태</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filterdList.map((row) => (
            <Row key={row.no} row={row} />
          ))}
    
        </TableBody>
      </Table>

    </TableContainer>
    </>
  );
}
