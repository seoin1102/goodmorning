package com.douzone.goodmorning.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.douzone.goodmorning.vo.ProjectVo;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class ProjectRepository {
	private final SqlSession sqlSession;

	public List<ProjectVo> findAll(Long crewNo) {
		return sqlSession.selectList("project.findAll", crewNo);
	}

//	public Boolean insert(ProjectVo taskVo) {
//		return sqlSession.insert("task.insert", taskVo) == 1;
//	}
//
//	public Boolean update(ProjectVo taskVo) {
//		return sqlSession.insert("task.update", taskVo) == 1;
//	}
//
//	public Boolean delete(Long id) {
//		return sqlSession.insert("task.delete", id) == 1;
//
//	}

}
