package com.douzone.goodmorning.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.douzone.goodmorning.vo.CrewVo;

import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
@Repository
public class CrewRepository {

	private final SqlSession sqlSession;
	
	public List<CrewVo> findAll(Long channelNo) {
		return sqlSession.selectList("crew.findAll", channelNo);
	}

	public boolean insert(CrewVo crewVo) {
		return sqlSession.insert("crew.insert", crewVo) == 1;
	}
	
	// crew_user 관련 레포지토리
	public List<CrewVo> findCrewUser(Long no) {
		return sqlSession.selectList("crew.findCrewUser", no);
	}
	
}
