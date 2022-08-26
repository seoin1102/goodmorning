package com.douzone.goodmorning.controller.api;

import java.nio.charset.Charset;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.douzone.goodmorning.dto.Message;
import com.douzone.goodmorning.dto.status.StatusEnum;
import com.douzone.goodmorning.service.ChatService;
import com.douzone.goodmorning.vo.ChatVo;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api")
@Controller
public class ChatApiController {
    private final ChatService chatService;
    
    // 채팅 리스트 가져오기
    @GetMapping("/chat/{crewNo}")
    public ResponseEntity<Message> chatList(@PathVariable("crewNo") Long crewNo) {
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	
    	Message message = new Message(); 	
    	message.setStatus(StatusEnum.OK);
    	message.setMessage("[" + crewNo + " 크루]" + " 메시지 리스트");
    	message.setData(chatService.getMessageList(crewNo));
    	
    	return ResponseEntity.ok().headers(headers).body(message);
    }
    
    // 채팅 추가
    @PostMapping("/chat/{crewNo}/{userNo}")
    public ResponseEntity<Message> chatAdd(@PathVariable("crewNo") Long crewNo, @PathVariable("userNo") Long userNo, @RequestBody ChatVo chatVo) {
    	System.out.println("!!!!!!!!!!!!!!!!!" + chatVo);
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	
    	Message message = new Message(); 	
    	message.setStatus(StatusEnum.OK);
    	message.setMessage("[" + crewNo + " 크루]" + " 메시지 추가");
    	message.setData("success");
    	if(!chatService.AddMessage(chatVo))
    		message.setData("fail");

    	return ResponseEntity.ok().headers(headers).body(message);
    }
}
