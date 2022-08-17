package com.douzone.goodmorning.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.douzone.goodmorning.vo.ChannelVo;
import com.douzone.goodmorning.vo.TaskVo;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class TaskRepository {
	private final SqlSession sqlSession;

	public List<TaskVo> findAll(Long projectNo) {
		return sqlSession.selectList("task.findAll", projectNo);
	}

	public Boolean insert(TaskVo taskVo) {
		return sqlSession.insert("task.insert", taskVo) == 1;
	}

}
