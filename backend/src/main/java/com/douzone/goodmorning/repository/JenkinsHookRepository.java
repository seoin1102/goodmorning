package com.douzone.goodmorning.repository;

import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class JenkinsHookRepository {

	private final SqlSession sqlSession;

	public int insert(Map<String, String> map) {
		return sqlSession.insert("jenkinshook.insert",map);
		
	}

}
