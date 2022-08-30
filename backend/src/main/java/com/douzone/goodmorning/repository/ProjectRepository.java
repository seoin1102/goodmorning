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

	public Boolean insert(ProjectVo projectVo) {
		return sqlSession.insert("project.insert", projectVo) == 1;
	}

	public Boolean update(ProjectVo projectVo) {
		return sqlSession.insert("project.update", projectVo) == 1;
	}

	public Boolean delete(Long id) {
		sqlSession.insert("task.delete", id);
		return sqlSession.insert("project.delete", id) == 1;

	}

}
