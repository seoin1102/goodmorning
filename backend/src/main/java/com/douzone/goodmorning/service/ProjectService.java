package com.douzone.goodmorning.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.douzone.goodmorning.repository.ProjectRepository;
import com.douzone.goodmorning.vo.ProjectVo;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ProjectService {
	private final ProjectRepository projectRepository;
	
	public List<ProjectVo> getProject(Long crewNo) {
		return projectRepository.findAll(crewNo);
	}
	
//	public Boolean updateTask(ProjectVo projectVo) {
//		return projectRepository.update(projectVo);
//	}

	public Boolean addTask(ProjectVo projectVo) {
		return projectRepository.insert(projectVo);
	}
//
//	public Boolean deleteTask(Long id) {
//		return taskRepository.delete(id);
//
//	}

}
