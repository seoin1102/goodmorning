package com.douzone.goodmorning.controller;

import java.nio.charset.Charset;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.douzone.goodmorning.dto.Message;
import com.douzone.goodmorning.dto.status.StatusEnum;
import com.douzone.goodmorning.service.CrewService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:9090", allowedHeaders = {"GET", "POST", "PUT", "DELETE"})
@RequestMapping("/api")
@Controller
public class CrewController {
	
    private final CrewService crewService;
	private final Message message;
	
    @GetMapping("/crew/{channelNo}")
    public ResponseEntity<Message> crews(@PathVariable("channelNo") Long channelNo) {
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	
    	message.setStatus(StatusEnum.OK);
    	message.setMessage("채널목록 조회");
    	message.setData(crewService.getCrew(channelNo));
    	return ResponseEntity.ok().headers(headers).body(message);

    }
}
