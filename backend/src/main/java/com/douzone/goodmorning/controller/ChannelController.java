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
import com.douzone.goodmorning.service.ChannelService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:9090", allowedHeaders = {"GET", "POST", "PUT", "DELETE"})
@RequestMapping("/api")
@Controller
public class ChannelController {

    private final ChannelService channelService;
	private final Message message;
  
	/**
	 * 채널 리스트 정보
	 * @param userNo 채널 주인의 유저번호
	 * @return 해당 유저가 소유한 유저 리스트
	 */
    @GetMapping("/channel/{userNo}")
    public ResponseEntity<Message> channels(@PathVariable("userNo") Long userNo) {
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	
    	message.setStatus(StatusEnum.OK);
    	message.setMessage("채널 목록");
    	message.setData(channelService.getChannel(userNo));
    	return ResponseEntity.ok().headers(headers).body(message);

    }
    
    @PostMapping("/channel/{userNo}")
    public ResponseEntity<Message> channel(@PathVariable("userNo") Long userNo) {
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	
    	message.setStatus(StatusEnum.OK);
    	message.setMessage("채널 목록");
    	message.setData(channelService.addChannel(userNo));
    	return ResponseEntity.ok().headers(headers).body(message);

    }

}
