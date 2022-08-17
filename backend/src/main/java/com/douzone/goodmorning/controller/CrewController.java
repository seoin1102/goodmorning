package com.douzone.goodmorning.controller;

import java.nio.charset.Charset;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.douzone.goodmorning.dto.Message;
import com.douzone.goodmorning.dto.status.StatusEnum;
import com.douzone.goodmorning.service.CrewService;
import com.douzone.goodmorning.vo.ChannelVo;
import com.douzone.goodmorning.vo.CrewVo;

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
    	message.setMessage("크루목록 조회");
    	message.setData(crewService.getCrew(channelNo));
    	return ResponseEntity.ok().headers(headers).body(message);

    }
    
    @PostMapping("/crew/{channelNo}")
    public ResponseEntity<Message> crew(@PathVariable("channelNo") Long userNo, CrewVo crewVo) {
    	crewVo.setMasterCrewUserNo(userNo);
    	crewService.addCrew(crewVo);
    	
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	
    	message.setStatus(StatusEnum.OK);
    	message.setMessage("크루추가 성공");
    	message.setData(crewVo);
    	return ResponseEntity.ok().headers(headers).body(message);

    }
}
