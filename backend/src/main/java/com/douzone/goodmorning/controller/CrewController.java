package com.douzone.goodmorning.controller;

import java.nio.charset.Charset;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.douzone.goodmorning.dto.Message;
import com.douzone.goodmorning.dto.status.StatusEnum;
import com.douzone.goodmorning.security.Auth;
import com.douzone.goodmorning.service.CrewService;
import com.douzone.goodmorning.vo.CrewVo;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:9090", allowedHeaders = {"GET", "POST", "PUT", "DELETE"})
@RequestMapping("/api")
@Controller
public class CrewController {
	
    private final CrewService crewService;
	

	@Auth
    @GetMapping("/crew/{channelNo}/{userNo}")
    public ResponseEntity<Message> crews(@PathVariable("channelNo") Long channelNo, @PathVariable("userNo") Long userNo) {
    	
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	
    	Message message = new Message();
    	message.setStatus(StatusEnum.OK);
    	message.setMessage("크루목록 조회");
    	message.setData(crewService.getCrew(channelNo, userNo));   	
    	
    	return ResponseEntity.ok().headers(headers).body(message);
    }
    
    @PostMapping("/crew/{channelNo}/{userNo}")
    public ResponseEntity<Message> crew(@PathVariable("channelNo") Long channelNo, @PathVariable("userNo") Long userNo, @RequestBody CrewVo crewVo) {
    	
    	crewVo.setChannelNo(channelNo);
    	crewVo.setMasterCrewUserNo(userNo);
    	crewService.addCrew(crewVo);
    	Long crewNo = crewService.findMaster(channelNo, userNo);
    	crewService.addCrewUser(crewNo, userNo);
    	
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	
    	Message message = new Message();
    	message.setStatus(StatusEnum.OK);
    	message.setMessage("크루추가 성공");
    	message.setData(crewVo);
    	return ResponseEntity.ok().headers(headers).body(message);

    }
    
	// crew_user 관련 컨트롤러
    
    @GetMapping("/crew/user/{no}")
    public ResponseEntity<Message> crewUser(@PathVariable("no") Long no) {
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	
    	Message message = new Message();
    	message.setStatus(StatusEnum.OK);
    	message.setMessage("크루유저목록 조회");
    	message.setData(crewService.getCrewUser(no));
    	System.out.println(crewService.getCrewUser(no));
    	return ResponseEntity.ok().headers(headers).body(message);

    }
}
