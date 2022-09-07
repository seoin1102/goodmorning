package com.douzone.goodmorning.controller;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Map.Entry;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.goodmorning.service.JenkinsHookService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/jenkinsHook")
@RestController
@RequiredArgsConstructor
public class JenkinsHookController {
	
	private final JenkinsHookService jenkinsHookService;
	
	@GetMapping("/hookdata")
	public void jenkinshook(@RequestBody HashMap<String, Object> data) {
		
		for(Entry<String, Object> entry : data.entrySet()) {
		if(!"null".equals(entry.getKey())) {
		String key = entry.getKey();
		System.out.println("키:" + key);
		}
		if(entry.getValue()!=null) {
		String value = entry.getValue().toString();
		System.out.println("밸류:" + value);
		}
	}
		
		Map<String,Object> map = new LinkedHashMap<>();
		
		Entry<String, Object> entry = data.entrySet().iterator().next();
		String key= entry.getKey();
		switch(key) {
			case "build":
				jenkinsHookService.insertBuildJenkinsHookResult(data);
				break;
		}
		
	}
	@PostMapping("/jenkinsHookChatData")
	public void gitHookChatData() {
		System.out.println(jenkinsHookService.getJenkinsHookData());
	}
}
