package com.douzone.goodmorning.controller;

import java.nio.charset.Charset;
import java.util.HashMap;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.goodmorning.dto.Message;
import com.douzone.goodmorning.dto.status.StatusEnum;
import com.douzone.goodmorning.service.CrewService;
import com.douzone.goodmorning.service.GithubHookService;
import com.douzone.goodmorning.service.ProjectService;
import com.douzone.goodmorning.service.RedisPublisher;
import com.douzone.goodmorning.vo.ChatVo;

import lombok.RequiredArgsConstructor;


@RequestMapping("/api/githubhook")
@RestController
@RequiredArgsConstructor
public class GitHubHookController {
	
	private final GithubHookService githubHookService;
	private final ProjectService projectService;
	private final CrewService crewService;
	private final RedisPublisher redisPublisher;
	
	@PostMapping("/hookdata")
	public ResponseEntity<Message> githubhook(@RequestHeader HashMap<String, String> headerData, @RequestBody HashMap<String, Object> data){	
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	
    	String projectName = ((HashMap<String, Object>) data.get("repository")).get("name").toString();
    	
    	Message message = new Message();
    	message.setStatus(StatusEnum.OK);
    	message.setMessage("success");
    	//message.setData(headerData.get("x-github-event"));
//    	message.setData(projectName);
    	
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
		
		ChatVo chatVo = projectService.findCrewNoByName(projectName);
		chatVo.setUserNo(crewService.findMaster(projectName));
		chatVo.setMessage(githubHookService.findMessageByProjectNo(projectName));
		chatVo.setType(ChatVo.MessageType.GITHUB);
		
		message.setData(chatVo);
		
		String topic = Long.toString(chatVo.getCrewNo());
		
    	if(ChatVo.MessageType.GITHUB.equals(chatVo.getType())) {
    		redisPublisher.publish(topic, chatVo);
    		message.setData(topic);
    	}
//		System.out.println(data);
//		System.out.println(data.values().toArray()[0]);
//		System.out.println("================================");
//		
//		for(Entry<String, Object> entry : headerData.entrySet()) {
//			if(!"null".equals(entry.getKey())) {
//			String key = entry.getKey();
//			System.out.println("키:" + key);
//			}
//			if(entry.getValue()!=null) {
//			String value = entry.getValue().toString();
//			System.out.println("밸류:" + value);
//			}
//		}
//		
//		System.out.println("===========================");
//		
//		for(Entry<String, Object> entry : data.entrySet()) {
//			if(!"null".equals(entry.getKey())) {
//			String key = entry.getKey();
//			System.out.println("키:" + key);
//			}
//			if(entry.getValue()!=null) {
//			String value = entry.getValue().toString();
//			System.out.println("밸류:" + value);
//			}
//		}
		
		return ResponseEntity.ok().headers(headers).body(message);
	}
	
	@PostMapping("/gitHookChatData")
	public void gitHookChatData() {
		System.out.println(githubHookService.getGitHookData());
	}
	
}
