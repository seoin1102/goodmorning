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
import com.douzone.goodmorning.service.TaskService;
import com.douzone.goodmorning.vo.ProjectVo;

import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
@RequestMapping("/api/project")
@RestController
public class ProjectController {
    private final ProjectService projectService;
    private final TaskService taskService;

	/**
	 * 채널 리스트 정보
	 * @param userNo 채널 주인의 유저번호
	 * @return 해당 유저가 소유한 유저 리스트
	 */
    
    @GetMapping("/{crewNo}")
    public ResponseEntity<JsonResult> projectList(@PathVariable("crewNo") Long crewNo) {
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(projectService.getProject(crewNo)));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<JsonResult> update(@RequestBody ProjectVo projectVo) {
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	System.out.println(projectVo);
    	System.out.println(projectService.updateProject(projectVo));
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(projectService.updateProject(projectVo)));
    }
    
    @PostMapping("")
    public ResponseEntity<JsonResult> add(@RequestBody ProjectVo projectVo) {
    	System.out.println("qqqqqqqqqqqqqq " + projectVo);
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(projectService.addProject(projectVo)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<JsonResult> delete(@PathVariable("id") Long id) {
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	taskService.deleteTask(id);
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(projectService.deleteProject(id)));
    }
    
    
    
    @GetMapping("/gitCmdTest")
    public ResponseEntity<JsonResult> gitTest() {
    	projectService.execGit("ipconfig");
    	return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success("됬나?"));
    } 
    
    
    
}
