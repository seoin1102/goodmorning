package com.douzone.goodmorning.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.douzone.goodmorning.vo.ChatVo;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class ChatRepository {
	private final SqlSession sqlSession;
	
	public List<ChatVo> findAllByCrewNo(Long crewNo) {
		return sqlSession.selectList("chat.findAllByCrewNo", crewNo);
	}

	public Boolean insertByCrewNoAndUserNo(ChatVo chatVo) {
		return sqlSession.insert("chat.insertByCrewNoAndUserNo", chatVo) == 1;
	}

}
