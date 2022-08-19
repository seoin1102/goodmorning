package com.douzone.goodmorning.service;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Map.Entry;

import org.springframework.stereotype.Service;

import com.douzone.goodmorning.repository.GitHubHookRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GithubHookService {
	
	private final GitHubHookRepository gitHubHookRepository;
	
	public int pushEventInsert(HashMap<String, Object> data, String key) {
		Map<String,String> map = new HashMap<String, String>();
		
		map.put("eventType",key);
		map.put("pusher", ((HashMap<String, Object>) data.get("pusher")).get("name").toString());
		map.put("message",((HashMap<String, Object>) data.get("head_commit")).get("message").toString());
		map.put("projectName",((HashMap<String, Object>) data.get("repository")).get("name").toString());
		//map.put("timeStamp",((HashMap<String, Object>) data.get("head_commit")).get("timestamp").toString());
		
		return gitHubHookRepository.pusherEventInsert(map);
	}

	public int deleteEventInsert(HashMap<String, Object> data, String key) {
		Map<String,String> map = new HashMap<String, String>();
		
		map.put("eventType",key);
		map.put("pusher", ((HashMap<String, Object>) data.get("sender")).get("login").toString());
		map.put("projectName", ((HashMap<String, Object>) data.get("repository")).get("name").toString());
		map.put("message",data.get("ref") +" 의 " + data.get("ref_type") +" 삭제" );
		
		return gitHubHookRepository.pusherEventInsert(map);
	}

	public int createEventInsert(HashMap<String, Object> data, String key) {
		
		Map<String,String> map = new HashMap<String, String>();

		map.put("eventType",key);
		map.put("pusher", ((HashMap<String, Object>) data.get("sender")).get("login").toString());
		map.put("projectName", ((HashMap<String, Object>) data.get("repository")).get("name").toString());
		map.put("message",data.get("ref") +"  " + data.get("ref_type") +" 생성" );
		
		return gitHubHookRepository.pusherEventInsert(map);
		
	}

	public int pullReqeustEventInsert(HashMap<String, Object> data, String key) {
		
		Map<String,String> map = new HashMap<String, String>();
		
		map.put("eventType",key);
		map.put("pusher", ((HashMap<String, Object>) data.get("sender")).get("login").toString());
		map.put("projectName", ((HashMap<String, Object>) data.get("repository")).get("name").toString());
		if(data.get("action").toString().equals("synchronize")) {
			map.put("message", "pullRequest " +data.get("action").toString()+ " : "+ ((HashMap<String, Object>) data.get("pull_request")).get("body").toString());
		}else {
			map.put("message","pullRequest " +data.get("action").toString());
		}
		return gitHubHookRepository.pusherEventInsert(map);
		
	}
	
	


}
