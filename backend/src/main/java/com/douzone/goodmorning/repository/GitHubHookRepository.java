package com.douzone.goodmorning.repository;

import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class GitHubHookRepository {
	
	private final SqlSession sqlSession;

	public int pusherEventInsert(Map<String, String> map) {
		return sqlSession.insert("githubhook.insert",map);
	}
	

}
