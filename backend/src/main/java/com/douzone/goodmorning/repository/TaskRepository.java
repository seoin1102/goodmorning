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

<<<<<<< HEAD
	public List<TaskVo> findAll(Long projectNo) {
		return sqlSession.selectList("task.findAll", projectNo);
	}

	public Boolean insert(TaskVo taskVo) {
		return sqlSession.insert("task.insert", taskVo) == 1;
=======
	public List<TaskVo> findByProject(Long projectNo) {
		return sqlSession.selectList("task.findByProject", projectNo);
	}
	public List<TaskVo> findByCrew(Long crewNo) {
		return sqlSession.selectList("task.findByCrew", crewNo);
	}
	
	public List<TaskVo> findByChannel(Long channelNo) {
		return sqlSession.selectList("task.findByChannel", channelNo);
	}

	public Boolean insert(TaskVo taskVo) {
		Boolean result = sqlSession.insert("task.insert", taskVo)==1;
		long projectNo = taskVo.getProjectNo();		
		sqlSession.update("task.projectUpdate", projectNo);
		
		return result;
	}

	public Boolean update(TaskVo taskVo) {
		Boolean result = sqlSession.insert("task.update", taskVo)==1;
		long projectNo = taskVo.getProjectNo();
		sqlSession.update("task.projectUpdate", projectNo);
		
		return result;
	}

	public Boolean delete(Long id) {
		return sqlSession.delete("task.delete", id) == 1;
>>>>>>> d3619909f30f29004bd62c55fe23b397f8f90b1f
	}

}
