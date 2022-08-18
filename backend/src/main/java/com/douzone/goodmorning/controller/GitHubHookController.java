package com.douzone.goodmorning.controller;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.ibatis.session.SqlSession;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.goodmorning.service.GithubHookService;

import lombok.RequiredArgsConstructor;


@RequestMapping("/api/githubhook")
@RestController
@RequiredArgsConstructor
public class GitHubHookController {
	
	private final GithubHookService githubHookService;
	
	@PostMapping("/hookdata")
	public void githubhook(@RequestHeader HashMap<String,Object> headerData,@RequestBody HashMap<String, Object> data){
		
//		System.out.println(data);
//		System.out.println(data.values().toArray()[0]);
//		System.out.println("================================");
		
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
		
		
		
		String key= headerData.get("x-github-event").toString();
		switch(key) {
			case "push":
				githubHookService.pushEventInsert(data);
				break;
		}
		
	}
	
}
