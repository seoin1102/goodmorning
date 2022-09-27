package com.douzone.goodmorning.service;

import java.util.List;

import org.springframework.stereotype.Service;

<<<<<<< HEAD
import com.douzone.goodmorning.repository.ChannelRepository;
import com.douzone.goodmorning.repository.TaskRepository;
import com.douzone.goodmorning.vo.ChannelVo;
=======
import com.douzone.goodmorning.repository.TaskRepository;
>>>>>>> d3619909f30f29004bd62c55fe23b397f8f90b1f
import com.douzone.goodmorning.vo.TaskVo;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class TaskService {
	private final TaskRepository taskRepository;
	
<<<<<<< HEAD
	public List<TaskVo> getTask(Long projectNo) {
		return taskRepository.findAll(projectNo);
=======
	public List<TaskVo> findByProject(Long projectNo) {
		return taskRepository.findByProject(projectNo);
	}
	
	public List<TaskVo> findByCrew(Long crewNo) {
		return taskRepository.findByCrew(crewNo);
	}
	
	public List<TaskVo> findByChannel(Long channelNo) {
		return taskRepository.findByChannel(channelNo);
	}
	
	public Boolean updateTask(TaskVo taskVo) {
		return taskRepository.update(taskVo);
>>>>>>> d3619909f30f29004bd62c55fe23b397f8f90b1f
	}

	public Boolean addTask(TaskVo taskVo) {
		return taskRepository.insert(taskVo);
	}

<<<<<<< HEAD
=======
	public Boolean deleteTask(Long id) {
		return taskRepository.delete(id);

	}

>>>>>>> d3619909f30f29004bd62c55fe23b397f8f90b1f
}
