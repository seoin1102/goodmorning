package com.douzone.goodmorning.controller;

import java.nio.charset.Charset;
import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.douzone.goodmorning.dto.Message;
import com.douzone.goodmorning.dto.status.StatusEnum;
import com.douzone.goodmorning.security.Auth;
import com.douzone.goodmorning.service.ChannelService;
import com.douzone.goodmorning.service.CrewService;
import com.douzone.goodmorning.vo.CrewVo;
import com.douzone.goodmorning.vo.UserVo;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:9090", allowedHeaders = {"GET", "POST", "PUT", "DELETE"})
@RequestMapping("/api")
@Controller
public class CrewController {
	
    private final CrewService crewService;
	private final ChannelService channelService;
	

	@Auth
    @Transactional
    @GetMapping("/crew/{userNo}")
    public ResponseEntity<Message> allCrew(@PathVariable("userNo") Long userNo) {
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	
    	Message message = new Message();
    	message.setStatus(StatusEnum.OK);
    	message.setMessage("크루유저목록 조회");
    	message.setData(crewService.getAllCrew(userNo));
    	return ResponseEntity.ok().headers(headers).body(message);
    }
	
	@Auth
	@Transactional
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
	
	@Transactional
    @PostMapping("/crew/{channelNo}/{userNo}")
    public ResponseEntity<Message> crew(@PathVariable("channelNo") Long channelNo, @PathVariable("userNo") Long userNo, @RequestBody CrewVo crewVo) {
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	
    	crewVo.setChannelNo(channelNo);
    	crewVo.setMasterCrewUserNo(userNo);
    	crewService.addCrew(crewVo);
    	Long crewNo = crewService.findMaster(channelNo, userNo);
    	crewVo.setNo(crewNo);
    	crewService.addCrewUser(crewNo, userNo, 1L);
    	    	
    	Message message = new Message();
    	message.setStatus(StatusEnum.OK);
    	message.setMessage("크루추가 성공");
    	message.setData(crewVo);
    	return ResponseEntity.ok().headers(headers).body(message);
    }
    
	// crew_user 관련 컨트롤러
    
    @Transactional
    @GetMapping("/crew/user/{no}")
    public ResponseEntity<Message> crewUser(@PathVariable("no") Long no) {
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	
    	Message message = new Message();
    	message.setStatus(StatusEnum.OK);
    	message.setMessage("크루유저목록 조회");
    	message.setData(crewService.getCrewUser(no));
    	return ResponseEntity.ok().headers(headers).body(message);
    }
    
    @Transactional
    @PutMapping("/crew/{crewNo}")
    public ResponseEntity<Message> updateLastIn(@PathVariable("crewNo") String crewNo, @RequestBody UserVo userVo) {
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	
    	crewService.updateLastIn(crewNo, userVo.getNo());
    	    	
    	Message message = new Message();
    	message.setStatus(StatusEnum.OK);
    	message.setMessage("크루 마지막 접속 업데이트 성공");
    	message.setData("success");
    	return ResponseEntity.ok().headers(headers).body(message);
    }
    
    @Transactional
    @PutMapping("/crew/update")
    public ResponseEntity<Message> updateCrewName(@RequestBody CrewVo crewVo) {
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	
    	crewService.updateCrewName(crewVo);
    	    	
    	Message message = new Message();
    	message.setStatus(StatusEnum.OK);
    	message.setMessage("크루 이름 업데이트 성공");
    	message.setData("success");
    	return ResponseEntity.ok().headers(headers).body(message);
    }
    
    @Transactional
    @PostMapping("/crew/invite/{channelNo}/{crewNo}")
    public ResponseEntity<Message> inviteCrew(@PathVariable("channelNo") String channelNo, @PathVariable("crewNo") String crewNo, @RequestBody UserVo userVo) {
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	
    	Message message = new Message();
    	message.setStatus(StatusEnum.OK);
    	
    	System.out.println("zzzzzzzzzzzz"+userVo);
    	
    	int checkcount = channelService.checkUser(channelNo,userVo.getEmail());
    		
    	if(checkcount == 0) {
        	message.setMessage("유저가 채널에 존재하지 않습니다.");
        	message.setData("fail");
    		return ResponseEntity.ok().headers(headers).body(message);
    	}
    	
    	int userNo = channelService.findUserNoByEmail(userVo.getEmail());
    	if(userNo == 0) {
        	message.setMessage("가입한 유저가 아닙니다.");
        	message.setData("fail");
    		return ResponseEntity.ok().headers(headers).body(message);
    	}
    	
    	checkcount = crewService.checkCrewUser(userNo, crewNo);
    	if(checkcount == 1) {
    		message.setMessage("현재 크루에 유저가 존재 합니다.");
        	message.setData("fail");
    		return ResponseEntity.ok().headers(headers).body(message);
    	}
    	
    	
    	crewService.addCrewUser(Long.valueOf(crewNo),Long.valueOf(userNo), 0L);
    	
    	message.setMessage("유저 초대에 성공하였습니다.");
    	message.setData("success");
    	return ResponseEntity.ok().headers(headers).body(message);
    }
    
    @Transactional
    @DeleteMapping("/crew/delete/{crewNo}/{userNo}")
    public ResponseEntity<Message> deleteCrewUser(@PathVariable("crewNo") Long crewNo, @PathVariable("userNo") Long userNo) {
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	
    	crewService.deleteCrewUser(crewNo,userNo);
   
    	Message message = new Message();
    	message.setStatus(StatusEnum.OK);
    	message.setMessage("크루 유저 삭제 성공");
    	message.setData("success");
    	return ResponseEntity.ok().headers(headers).body(message);
    }
}
