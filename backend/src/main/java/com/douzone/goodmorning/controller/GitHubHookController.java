package com.douzone.goodmorning.controller;

import java.util.HashMap;


import org.apache.ibatis.session.SqlSession;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import lombok.RequiredArgsConstructor;

import org.json.simple.JSONObject; // JSON객체 생성
import org.json.simple.JSONArray; // JSON이 들어있는 Array 생성
import org.json.simple.parser.JSONParser; // JSON객체 파싱
import org.json.simple.parser.ParseException; // 예외처리


@RequestMapping("/githubhook")
@RestController
@RequiredArgsConstructor
public class GitHubHookController {
	
	//private final SiteService service;
	private final SqlSession sqlSession;
	
	@PostMapping("/test")
	public void add2(@RequestBody HashMap<String, Object> prama){
		System.out.println(prama);
		JSONArray jsonArray = new JSONArray();
		jsonArray.add(prama);
		String jsonStr = jsonArray.toJSONString();
		System.out.println(jsonStr);
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
