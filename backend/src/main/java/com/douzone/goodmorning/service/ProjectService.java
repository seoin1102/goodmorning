package com.douzone.goodmorning.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.douzone.goodmorning.repository.ProjectRepository;
import com.douzone.goodmorning.repository.TaskRepository;
import com.douzone.goodmorning.vo.ProjectVo;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ProjectService {
	private final ProjectRepository projectRepository;
	private final TaskRepository taskRepository;

	public List<ProjectVo> findByCrew(Long crewNo) {
		return projectRepository.findByCrew(crewNo);
	}
	
	public List<ProjectVo> findByChannel(Long channelNo) {
		return projectRepository.findByChannel(channelNo);
	}
	
	public Boolean updateProject(ProjectVo projectVo) {
		return projectRepository.update(projectVo);
	}

	public Boolean addProject(ProjectVo projectVo) {
		return projectRepository.insert(projectVo);
	}


	public Boolean deleteProject(Long id) {
		taskRepository.delete(id);
		return projectRepository.delete(id);

	}

}
