package com.douzone.goodmorning.repository;

import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.douzone.goodmorning.vo.UserVo;
import com.douzone.goodmorning.vo.VerificationTokenVo;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class UserRepository {
	
	private final SqlSession sqlSession;
	
	
	public int insert(UserVo vo) {
		return sqlSession.insert("user.insert",vo);
	}


	public UserVo existsById(UserVo vo) {
		System.out.println(vo);
		return sqlSession.selectOne("user.existsById",vo);
	}


	public UserVo findByEmailAndPassword(UserVo vo) {
		return sqlSession.selectOne("user.findByEmailAndPassword",vo);
	}

	public UserVo findByEnable(UserVo vo) {
		return sqlSession.selectOne("user.findByEnable",vo);
	}
	
	public int updateEnable(VerificationTokenVo vo) {
		
		return sqlSession.update("user.updateEnable",vo);
	}


	public int updatePw(String email, String token) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("email", email);
		map.put("token", token);
		return sqlSession.update("user.updatePw",map);
	}





}
