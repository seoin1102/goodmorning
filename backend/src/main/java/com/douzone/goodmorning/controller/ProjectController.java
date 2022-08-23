package com.douzone.goodmorning.controller;

import java.nio.charset.Charset;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.goodmorning.dto.JsonResult;
import com.douzone.goodmorning.service.ProjectService;

import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
@RequestMapping("/api/project")
@RestController
public class ProjectController {
    private final ProjectService projectService;
  
	/**
	 * 채널 리스트 정보
	 * @param userNo 채널 주인의 유저번호
	 * @return 해당 유저가 소유한 유저 리스트
	 */
    
    @GetMapping("/{crewNo}")
    public ResponseEntity<JsonResult> projectList(@PathVariable("crewNo") Long crewNo) {
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	
    	//System.out.println(taskService.getTask(projectNo));
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(projectService.getProject(crewNo)));
    }
    
//    @PutMapping("/{id}")
//    public ResponseEntity<JsonResult> update(@RequestBody TaskVo taskVo) {
//    	HttpHeaders headers = new HttpHeaders();
//    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
//    	 
//		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(taskService.updateTask(taskVo)));
//    }
//    
//    @PostMapping("")
//    public ResponseEntity<JsonResult> add(@RequestBody TaskVo taskVo) {
//    	HttpHeaders headers = new HttpHeaders();
//    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
//    	
//		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(taskService.addTask(taskVo)));
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<JsonResult> delete(@PathVariable("id") Long id) {
//    	HttpHeaders headers = new HttpHeaders();
//    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
//    	
//		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(taskService.deleteTask(id)));
//    }
    
}
