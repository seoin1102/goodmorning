package com.douzone.goodmorning.controller;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Map.Entry;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.goodmorning.exception.GlobalExceptionHandler;
import com.douzone.goodmorning.service.JenkinsHookService;

import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/api/jenkinsHook")
@RestController
@RequiredArgsConstructor
public class JenkinsHookController {
	
	private final JenkinsHookService jenkinsHookService;
	
	@PostMapping("/hookdata")
	public void jenkinshook(@RequestBody HashMap<String, Object> data) {
		
		log.error("######################################################################################");
		log.error(data.toString());
		log.error("######################################################################################");
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
