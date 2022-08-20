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
import org.springframework.web.bind.annotation.RequestMapping;

import com.douzone.goodmorning.dto.Message;
import com.douzone.goodmorning.dto.status.StatusEnum;
import com.douzone.goodmorning.service.ChannelService;
import com.douzone.goodmorning.vo.ChannelVo;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:9090", allowedHeaders = {"GET", "POST", "PUT", "DELETE"})
@RequestMapping("/api")
@Controller
public class ChannelController {

    private final ChannelService channelService;
  
	/**
	 * 채널 리스트 정보
	 * @param userNo 채널 주인의 유저번호
	 * @return 해당 유저가 소유한 유저 리스트
	 */
    @GetMapping("/channel/{channelNo}/{userNo}")
    public ResponseEntity<Message> channels(@PathVariable("channelNo") Long channelNo, @PathVariable("userNo") Long userNo) {
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	
    	Message message = new Message(); 	
    	message.setStatus(StatusEnum.OK);
    	message.setMessage("채널목록 조회");
    	message.setData(channelService.getChannel(channelNo,userNo));
    	return ResponseEntity.ok().headers(headers).body(message);

    }
    /**
     * 
     * @param channelNo
     * @param userNo
     * @return
     */
    @GetMapping("/channel/{userNo}")
    public ResponseEntity<Message> channels(@PathVariable("userNo") Long userNo) {
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	
    	Message message = new Message();
    	message.setStatus(StatusEnum.OK);
    	message.setMessage("첫 채널목록 조회");
    	message.setData(channelService.getFirstChannel(userNo));
    	return ResponseEntity.ok().headers(headers).body(message);

    }
    
    /**
     * application/x-www-form-urlencoded로 전달 할 경우 ChannelVo channelVo로 받기
     * application/json로 전달 할 경우 @RequestBody ChannelVo channelVo로 받기
     */
    @Transactional
    @PostMapping("/channel/{userNo}")
    public ResponseEntity<Message> channel(@PathVariable("userNo") Long userNo, ChannelVo channelVo) {
    	channelVo.setMasterChannelUserNo(userNo);
    	channelService.addChannel(channelVo);
    	
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	
    	Message message = new Message();
    	message.setStatus(StatusEnum.OK);
    	message.setMessage("채널추가 성공");
    	message.setData(channelVo);
    	return ResponseEntity.ok().headers(headers).body(message);

    }

}
