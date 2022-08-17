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
	
	public int pushEventInsert(HashMap<String, Object> data) {
		Map<String,String> map = new HashMap<String, String>();
		
		map.put("eventType","push");
		map.put("pusher", ((HashMap<String, Object>) data.get("pusher")).get("name").toString());
		map.put("message",((HashMap<String, Object>) data.get("head_commit")).get("message").toString());
		map.put("timeStamp",((HashMap<String, Object>) data.get("head_commit")).get("timestamp").toString());
		map.put("projectName",((HashMap<String, Object>) data.get("repository")).get("name").toString());
		
		System.out.println("맵출력테스트"+ map);
		return gitHubHookRepository.pusherEventInsert(map);
	}

}
