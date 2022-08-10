package com.douzone.goodmorning.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.douzone.goodmorning.vo.ChannelVo;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class ChannelRepository {
	private final SqlSession sqlSession;

	public List<ChannelVo> findAll(Long userNo) {
		return sqlSession.selectList("channel.findAllByUserNo", userNo);
	}

}
