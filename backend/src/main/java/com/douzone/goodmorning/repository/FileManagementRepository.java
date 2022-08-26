package com.douzone.goodmorning.repository;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.douzone.goodmorning.vo.FileManagementVo;

import lombok.RequiredArgsConstructor;


@Repository
@RequiredArgsConstructor
public class FileManagementRepository {
	private final SqlSession sqlSession;
	
	public Boolean insert(FileManagementVo vo) {
		return 1 == sqlSession.insert("filemanage.insert", vo);
	}

	public FileManagementVo findFile(String filename) {
		return sqlSession.selectOne("filemanage.findFile",filename);
	}
	
}
