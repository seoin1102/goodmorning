package com.douzone.goodmorning.controller;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.ibatis.session.SqlSession;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.goodmorning.service.GithubHookService;

import lombok.RequiredArgsConstructor;


@RequestMapping("/githubhook")
@RestController
@RequiredArgsConstructor
public class GitHubHookController {
	
	private final GithubHookService githubHookService;
	
	@PostMapping("/test")
	public void add2(@RequestBody HashMap<String, Object> data){
		
//		System.out.println(data);
//		System.out.println(data.values().toArray()[0]);
//		System.out.println("================================");
		
//		for(Entry<String, Object> entry : data.entrySet()) {
//		if(!"null".equals(entry.getKey())) {
//		String key = entry.getKey();
//		System.out.println("키:" + key);
//		}
//		if(entry.getValue()!=null) {
//		String value = entry.getValue().toString();
//		System.out.println("밸류:" + value);
//		}
//	}
		
		
		Map<String,Object> map = new LinkedHashMap<>();
		
		Entry<String, Object> entry = data.entrySet().iterator().next();
		String key= entry.getKey();
		System.out.println("테스트"+key); 
		switch(key) {
			case "pusher":
				githubHookService.pushEventInsert(data);
				break;
		}
		
	}
	
	@RequestMapping("/chatTest")
	public void chatTest(@RequestParam(value="id", required=true, defaultValue="") int id, @RequestParam(value="name", required=true, defaultValue="") String name ) {
//		TestChatUserVo testChatUserVo = new TestChatUserVo();
//		testChatUserVo.setId(id);
//		testChatUserVo.setName(name);
//		System.out.println(id + " : " + name);
//		System.out.println(testChatUserVo);
//		sqlSession.insert("insert",testChatUserVo);
		
	}
	
	
	
}
