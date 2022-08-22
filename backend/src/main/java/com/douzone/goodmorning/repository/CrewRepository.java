package com.douzone.goodmorning.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.douzone.goodmorning.vo.CrewVo;

import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
@Repository
public class CrewRepository {

	private final SqlSession sqlSession;
	
	@Transactional
	public List<CrewVo> findAll(Long channelNo, Long userNo) {
		Map<String, Object> map = new HashMap<>();
		map.put("channelNo", channelNo);
		map.put("userNo", userNo);
		return sqlSession.selectList("crew.findAll", map);
	}

	@Transactional
	public boolean insert(CrewVo crewVo) {
		return sqlSession.insert("crew.insert", crewVo) == 1;
	}


	@Transactional
	public Long findMaster(Long channelNo, Long userNo) {
		Map<String, Object> map = new HashMap<>();
		map.put("channelNo", channelNo);
		map.put("userNo", userNo);
		return sqlSession.selectOne("crew.findMaster", map);
		
	}

	@Transactional
	public void addCrewUser(Long masterNo, Long userNo) {
		Map<String, Object> map = new HashMap<>();
		map.put("masterNo", masterNo);
		map.put("userNo", userNo);
		sqlSession.insert("crew.insertcrewuser", map);
	}


	public List<CrewVo> findCrewUser(Long no) {
		return sqlSession.selectList("crew.findCrewUser", no);
	}
	

}
