package com.douzone.goodmorning.controller;

import java.nio.charset.Charset;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.goodmorning.dto.JsonResult;
import com.douzone.goodmorning.service.TaskService;

import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
@RequestMapping("/api")
@RestController
public class TaskController {
    private final TaskService taskService;
	
  
	/**
	 * 채널 리스트 정보
	 * @param userNo 채널 주인의 유저번호
	 * @return 해당 유저가 소유한 유저 리스트
	 */
    @GetMapping("/task/{projectNo}")
    public ResponseEntity<JsonResult> tasks(@PathVariable("projectNo") Long projectNo) {
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	
    	System.out.println(taskService.getTask(1L));
 
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(taskService.getTask(projectNo)));

    }
    
   

}
