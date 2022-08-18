package com.douzone.goodmorning.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.douzone.goodmorning.repository.TaskRepository;
import com.douzone.goodmorning.vo.TaskVo;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class TaskService {
	private final TaskRepository taskRepository;
	
	public List<TaskVo> getTask(Long projectNo) {
		return taskRepository.findAll(projectNo);
	}
	
	public Boolean updateTask(TaskVo taskVo) {
		return taskRepository.update(taskVo);
	}

	public Boolean addTask(TaskVo taskVo) {
		return taskRepository.insert(taskVo);
	}

}
