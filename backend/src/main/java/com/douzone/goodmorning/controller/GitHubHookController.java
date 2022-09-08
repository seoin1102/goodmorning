package com.douzone.goodmorning.controller;

import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.goodmorning.dto.Message;
import com.douzone.goodmorning.dto.status.StatusEnum;
import com.douzone.goodmorning.service.ChatService;
import com.douzone.goodmorning.service.CrewService;
import com.douzone.goodmorning.service.GithubHookService;
import com.douzone.goodmorning.service.ProjectService;
import com.douzone.goodmorning.service.RedisPublisher;
import com.douzone.goodmorning.service.UserService;
import com.douzone.goodmorning.vo.ChatVo;
import com.douzone.goodmorning.vo.CrewVo;

import lombok.RequiredArgsConstructor;


@RequestMapping("/api/githubhook")
@RestController
@RequiredArgsConstructor
public class GitHubHookController {
	
	private final GithubHookService githubHookService;
	private final ProjectService projectService;
	private final CrewService crewService;
	private final UserService userService;
	private final ChatService chatService;
	private final RedisPublisher redisPublisher;
	
	@Transactional
	@PostMapping("/hookdata")
	public ResponseEntity<Message> githubhook(@RequestHeader HashMap<String, String> headerData, @RequestBody HashMap<String, Object> data){	
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	   	
    	Message message = new Message();
    	message.setStatus(StatusEnum.OK);
    	message.setMessage("success");

    	String projectName = ((HashMap<String, Object>) data.get("repository")).get("name").toString();
    	
    	// github DB 저장
		String key= headerData.get("x-github-event");
		
		switch(key) {
			case "push":
				githubHookService.pushEventInsert(data, key);
				break;
			case "delete":
				githubHookService.deleteEventInsert(data,key);
				break;
			case "create":
				githubHookService.createEventInsert(data,key);
				break;	
			case "pull_request":
				githubHookService.pullReqeustEventInsert(data,key);
				break;	
		}
		////////////////////////////////////////////////////////////////
		////////////////////// GITHUB WEB HOOK END/////////////////////
		//////////////////////////////////////////////////////////////
		
		// Chat 객체 생성
		ChatVo chatVo = projectService.findCrewNoByName(projectName);
		chatVo.setUserNo(crewService.findMaster(projectName));
		chatVo.setMessage(githubHookService.findMessageByProjectNo(projectName));
		chatVo.setType(ChatVo.MessageType.GITHUB);
		chatVo.setUserName(userService.findUserNameByNo(chatVo.getUserNo()));
		
		message.setData(chatVo);
		
		// 채팅 DB 추가
    	if(!chatService.AddMessage(chatVo)) {
    		message.setData("fail");
    		return ResponseEntity.ok().headers(headers).body(message);
    	}
    	
    	// 방금 입력된 채팅의 no 가져오기
    	Long chatNo = chatService.getLastChat(chatVo.getCrewNo(), chatVo.getUserNo());
    	
    	// 크루에 속한 유저 no 리스트 가져오고
    	List<CrewVo> crewNoList = crewService.getUserNo(chatVo.getCrewNo());
		
    	// for문으로 insert 문 돌리기 check unread
    	for(int i = 0; i < crewNoList.size(); i++) {
    		chatService.insertChatUserByCrewNoAndChatNo(crewNoList.get(i).getUserNo(), chatNo);
    	}
    	
		////////////////////////////////////////////////////////////////
		////////////////////// Chat, Chat_user END/////////////////////
		//////////////////////////////////////////////////////////////
    	
		// 스톰프로 채팅 뿌리기
		String topic = Long.toString(chatVo.getCrewNo());
		
    	if(ChatVo.MessageType.GITHUB.equals(chatVo.getType())) {
    		redisPublisher.publish(topic, chatVo);
    		message.setData(topic);
    	}

		
		return ResponseEntity.ok().headers(headers).body(message);
	}
	
	@PostMapping("/gitHookChatData")
	public void gitHookChatData() {
		System.out.println(githubHookService.getGitHookData());
	}
	
}
