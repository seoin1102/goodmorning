package com.douzone.goodmorning.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.douzone.goodmorning.vo.ChannelVo;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class ChannelRepository {
	private final SqlSession sqlSession;

	@Transactional
	public List<ChannelVo> findAll(Long channelNo, Long userNo) {
		Map<String, Object> map = new HashMap<>();
		map.put("channelNo", channelNo);
		map.put("userNo", userNo);
		return sqlSession.selectList("channel.findAll", map);
	}

	@Transactional
	public Boolean insert(ChannelVo channelVo) {
		return sqlSession.insert("channel.insert", channelVo) == 1;
	}

	@Transactional
	public Object findFirst(Long userNo) {
		return sqlSession.selectList("channel.findFirst", userNo);
		
	}

}
