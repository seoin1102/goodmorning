// 1단계: 문 가져오기
import {
  Box, Button, Card,
  CardContent, Checkbox, Paper, Tab, Tabs, Typography
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { NavLink } from "react-router-dom";
import { get } from "../../apis/Axios";
import { setCREWFOCUS } from "../../redux/focus";
import { setProject } from "../../redux/project";

import clickgithub from "../../assets/icons/clickGithub.svg";
import clickjenkins from "../../assets/icons/clickJenkins.svg";
import clickmessage from "../../assets/icons/clickMessage.png";
import githubIcon from "../../assets/icons/github.svg";
import jenkinsIcon from "../../assets/icons/jenkins.png";
import unclickgithub from "../../assets/icons/unclickGithub.svg";
import unclickjenkins from "../../assets/icons/unclickJenkins.svg";
import unclickmessage from "../../assets/icons/unclickMessage.png";
import { setSearch } from "../../redux/search";
import "../../styles/css/Header.css";
import FileMessageItem from "../chat/FileMessageItem";
import GitMessageItem from "../chat/GitMessageItem";
import JenkinsMessageItem from "../chat/JenkinsMessageItem";
import SendPreviewMessage from "../chat/SendPreviewMessage";

// 필터 보류
// function SimpleAccordion() {
//   const [checkMessage, setCheckMessage] = React.useState(true);
//   const [checkGithub, setCheckGithub] = React.useState(true);
//   const [checkJenkins, setCheckJenkins] = React.useState(true);
//   const messageChange = (event) => {
//     setCheckMessage(event.target.checked);
//   };
//   const githubChange = (event) => {
//     setCheckGithub(event.target.checked);
//   };
//   const jenkinsChange = (event) => {
//     setCheckJenkins(event.target.checked);
//   };
//   return (
//     <div>
//       <Accordion sx={{width:'200px'}}>
//         <AccordionSummary
//           expandIcon={'▽'}
//           aria-controls="panel1a-content"
//           id="panel1a-header"
//         >
//           <Typography>메시지 타입</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Typography>
//           <ControlledCheckbox checkMessage={checkMessage} checkGithub={checkGithub} checkJenkins={checkJenkins} messageChange={messageChange} githubChange={githubChange} jenkinsChange={jenkinsChange}/>

//           </Typography>
//         </AccordionDetails>
//       </Accordion>

//     </div>
//   );
// }

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function ControlledCheckbox(props) {
  return (
    <>
      {props.checkMessage ? (
        <img src={clickmessage} style={{ height: "18px" }} />
      ) : (
        <img src={unclickmessage} style={{ height: "18px" }} />
      )}
      <Checkbox
        checked={props.checkMessage}
        onChange={props.messageChange}
        inputProps={{ "aria-label": "Checkbox demo" }}
        size="small"
      />
      {props.checkGithub ? (
        <img src={clickgithub} style={{ height: "20px" }} />
      ) : (
        <img src={unclickgithub} style={{ height: "20px" }} />
      )}
      <Checkbox
        checked={props.checkGithub}
        onChange={props.githubChange}
        inputProps={{ "aria-label": "Checkbox demo" }}
        size="small"
      />
      {props.checkJenkins ? (
        <img src={clickjenkins} style={{ height: "18px" }} />
      ) : (
        <img src={unclickjenkins} style={{ height: "18px" }} />
      )}
      <Checkbox
        sx={{ width: "20px", height: "20px" }}
        checked={props.checkJenkins}
        onChange={props.jenkinsChange}
        inputProps={{ "aria-label": "Checkbox demo" }}
        size="small"
      ></Checkbox>
    </>
  );
}

export default function SearchList(props) {
  const dispatch = useDispatch();
  const projectList = useSelector((state) => state.project, shallowEqual);
  const searchList = useSelector((state) => state.search, shallowEqual);

  const [value, setValue] = React.useState(0);
  const [checkMessage, setCheckMessage] = React.useState(true);
  const [checkGithub, setCheckGithub] = React.useState(true);
  const [checkJenkins, setCheckJenkins] = React.useState(true);

  const crewChatting = React.useCallback(
    async (crewNo) => {
      const getChatList = await get(`/chat/${crewNo}`);
      dispatch(setSearch(getChatList));
    },
    [dispatch]
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const channelNo = useSelector((state) => {
    return state.focus.channelNo;
  }, shallowEqual);
  console.log(";;;;;;;;;;;;;;;;;;;");
  console.log(channelNo);
  console.log(searchList);
  console.log(projectList);
  console.log(";;;;;;;;;;;;;;;;;;;");

  const initialProject = React.useCallback(
    async (crewNo) => {
      const getProjects = await get(`/project/cNo/${crewNo}`);
      dispatch(setProject(getProjects));
    },
    [dispatch]
  );

  const messageChange = (event) => {
    setCheckMessage(event.target.checked);
  };
  const githubChange = (event) => {
    setCheckGithub(event.target.checked);
  };
  const jenkinsChange = (event) => {
    setCheckJenkins(event.target.checked);
  };
  // React.useEffect(()=>{
  // initialProject
  // },[initialProject])

  const chattingResult = searchList.filter(
    (e) =>
      (e.message.indexOf(props.searchText) !== -1 && e.type !== "FILE")||
      (e.userName.indexOf(props.searchText) !== -1 && e.type == "CHAT")
  );

  const projectResult = projectList.filter(
    (e) =>
      e.projectName.indexOf(props.searchText) !== -1 ||
      e.crewName.indexOf(props.searchText) !== -1
  );

  const fileResult = searchList.filter(
    (e) =>
      (e.message.indexOf(props.searchText) !== -1 && e.type === "FILE")

  );
console.log(fileResult)
  return (
    <div>
      <Paper
        sx={{ height: "690px", overflow: "auto", width: "120%" }}
        elevation={0}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              label={`채팅 ${chattingResult.length}`}
              sx={{ fontFamily: "SUIT-Medium", fontWeight: "bolder" }}
              {...a11yProps(0)}
            />
            <Tab
              label={`프로젝트 ${projectResult.length}`}
              sx={{ fontFamily: "SUIT-Medium", fontWeight: "bolder" }}
              {...a11yProps(1)}
            />
            <Tab
              label={`파일 ${fileResult.length}`}
              sx={{ fontFamily: "SUIT-Medium", fontWeight: "bolder" }}
              {...a11yProps(2)}
            />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h6>
              <strong>채팅</strong>
            </h6>
            <div style={{ float: "right" }}>
              <ControlledCheckbox
                checkMessage={checkMessage}
                checkGithub={checkGithub}
                checkJenkins={checkJenkins}
                messageChange={messageChange}
                githubChange={githubChange}
                jenkinsChange={jenkinsChange}
              />
            </div>
          </div>
          {chattingResult != "" ? (
            chattingResult.map((e) => (
              <div>
                {e.type === "CHAT" && checkMessage ? (
                  <div>
                    <Card>
                      <CardContent className="searchcard">
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <div>
                            <Typography
                              sx={{ fontSize: 12, fontWeight: "bolder" }}
                              color="text.secondary"
                              gutterBottom
                            >
                              {e.crewName}
                            </Typography>
                          </div>
                          <div>
                            <Typography
                              sx={{ fontSize: 12 }}
                              color="text.secondary"
                              gutterBottom
                            >
                              &nbsp; {e.userName}
                            </Typography>
                          </div>
                        </div>
                        <Typography variant="h8" component="div">
                          {e.message}
                        </Typography>
                        <Typography
                          sx={{ mb: 1.3, fontSize: 12 }}
                          color="text.secondary"
                        >
                          {e.sendDate}
                        </Typography>
                        <NavLink
                          to={"/searchresult"}
                          style={{ textDecoration: "none" }}
                          state={{ search: e.message, sendDate: e.sendDate }}
                        >
                          <Button
                            size="small"
                            onClick={() => {
                              dispatch(
                                setCREWFOCUS({ no: e.crewNo, name: e.crewName })
                              );
                              crewChatting(e.crewNo);
                            }}
                          >
                            채팅방가기
                          </Button>
                        </NavLink>
                      </CardContent>
                    </Card>
                  </div>
                ) : null}
                {e.type === "GITHUB" && checkGithub ? (
                  <Card>
                    <CardContent className="searchcard">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <GitMessageItem
                          align={"left"}
                          message={e.message}
                          time={e.sendDate}
                          name={"GitHub"}
                          url={githubIcon}
                        />
                      </div>
                      <NavLink
                        to={"/searchresult"}
                        style={{ textDecoration: "none" }}
                        state={{ search: e.message, sendDate: e.sendDate }}
                      >
                        <Button
                          size="small"
                          onClick={() => {
                            dispatch(
                              setCREWFOCUS({ no: e.crewNo, name: e.crewName })
                            );
                            crewChatting(e.crewNo);
                          }}
                        >
                          채팅방가기
                        </Button>
                      </NavLink>
                    </CardContent>
                  </Card>
                ) : null}
                {e.type === "JENKINS" && checkJenkins ? (
                  <Card>
                    <CardContent className="searchcard">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <JenkinsMessageItem
                          align={"left"}
                          message={e.message}
                          time={e.sendDate}
                          name={"Jenkins"}
                          url={jenkinsIcon}
                        />
                      </div>
                      <NavLink
                        to={"/searchresult"}
                        style={{ textDecoration: "none" }}
                        state={{ search: e.message, sendDate: e.sendDate }}
                      >
                        <Button
                          size="small"
                          onClick={() => {
                            dispatch(
                              setCREWFOCUS({ no: e.crewNo, name: e.crewName })
                            );
                            crewChatting(e.crewNo);
                          }}
                        >
                          채팅방가기
                        </Button>
                      </NavLink>
                    </CardContent>
                  </Card>
                ) : null}
                
                {e.type === "PREVIEW" && checkMessage ? (
                  <Card>
                    <CardContent className="searchcard">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <SendPreviewMessage message={e.message} />
                        <NavLink
                          to={"/searchresult"}
                          style={{ textDecoration: "none" }}
                          state={{ search: e.message, sendDate: e.sendDate }}
                        >
                          <Button
                            size="small"
                            onClick={() => {
                              dispatch(
                                setCREWFOCUS({ no: e.crewNo, name: e.crewName })
                              );
                              crewChatting(e.crewNo);
                            }}
                          >
                            채팅방가기
                          </Button>
                        </NavLink>
                      </div>
                    </CardContent>
                  </Card>
                ) : null}
              </div>
            ))
          ) : (
            <div>채팅 기록에는 검색결과가 없습니다.</div>
          )}
          <br />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <h6>
            <strong>프로젝트</strong>
          </h6>
          {projectResult != "" ? (
            projectResult.map((e) => (
              <div>
                <Card>
                  <CardContent className="searchcard">
                    {e !== null ? (
                      <div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <div>
                            <Typography
                              sx={{ fontSize: 12, fontWeight: "bolder" }}
                              color="text.secondary"
                              gutterBottom
                            >
                              채널 이름 &nbsp;{e.crewName}
                            </Typography>
                          </div>
                          <div>
                            <Typography
                              sx={{ fontSize: 12 }}
                              color="text.secondary"
                              gutterBottom
                            >
                              &nbsp; 진행율 {e.status}%
                            </Typography>
                          </div>
                        </div>
                        <Typography variant="h8" component="div">
                          {e.projectName}
                        </Typography>
                        <br />
                        <Typography
                          sx={{ mb: 1.3, fontSize: 12 }}
                          color="text.secondary"
                        >
                          시작일자:&nbsp;{e.start}
                        </Typography>
                        <Typography
                          sx={{ mb: 1.3, fontSize: 12 }}
                          color="text.secondary"
                        >
                          종료일자:&nbsp;{e.end}
                        </Typography>
                      </div>
                    ) : null}

                    <NavLink to={"/project"} style={{ textDecoration: "none" }}>
                      <Button
                        size="small"
                        onClick={async() => {
                          dispatch(
                            setCREWFOCUS({ no: e.crewNo, name: e.crewName })
                          );
                          console.log({ no: e.crewNo, name: e.crewName });
                          const getProjects = await get(`/project/cNo/${e.crewNo}`)
                          dispatch(setProject(getProjects));
                          console.log(projectList);

                        }}
                      >
                        프로젝트 보러가기
                      </Button>
                    </NavLink>
                  </CardContent>
                </Card>
              </div>
            ))
          ) : (
            <div>프로젝트에는 검색결과가 없습니다.</div>
          )}
        </TabPanel>

        <TabPanel value={value} index={2}>
        <h6><strong>파일</strong></h6>
        {fileResult != "" ? (
            fileResult.map((e) => (
             <div>
            
            <Card>
              <CardContent className="searchcard">
                <FileMessageItem
                  align={"left"}
                  message={e.message}
                  time={e.sendDate}
                  name={e.userName}
                  url={e.profileUrl}
                />
                <NavLink
                  to={"/searchresult"}
                  style={{ textDecoration: "none" }}
                  state={{ search: e.message, sendDate: e.sendDate }}
                >
                  <Button
                    size="small"
                    onClick={() => {
                      dispatch(
                        setCREWFOCUS({ no: e.crewNo, name: e.crewName })
                      );
                      crewChatting(e.crewNo);
                    }}
                  >
                    채팅방가기
                  </Button>
                </NavLink>
    
              </CardContent>
            </Card>
          </div>
          ))
        ) : (
          <div>파일에는 검색결과가 없습니다.</div>
        )}
        </TabPanel>
      </Paper>
    </div>
  );
}
