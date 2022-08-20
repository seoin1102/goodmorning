package com.douzone.goodmorning.controller;

import java.nio.charset.Charset;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.douzone.goodmorning.dto.Message;
import com.douzone.goodmorning.dto.status.StatusEnum;
import com.douzone.goodmorning.repository.ChatRoomRepository;
import com.douzone.goodmorning.service.ChatService;
import com.douzone.goodmorning.service.RedisPublisher;
import com.douzone.goodmorning.vo.ChatMessage;
import com.douzone.goodmorning.vo.ChatVo;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:9090", allowedHeaders = {"GET", "POST", "PUT", "DELETE"})
@RequestMapping("/api")
@Controller
public class ChatController {

    private final RedisPublisher redisPublisher;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatService chatService;

    /**
     * websocket "/pub/chat/message"로 들어오는 메시징을 처리한다.
     */
    @MessageMapping("/chat/message")
    public void message(ChatMessage message) {
    	 System.out.println("메시지 전체내용~~~~~~~~~~~~~~~~~" + ":" + message);
    	
        if (ChatMessage.MessageType.ENTER.equals(message.getType())) {
        	System.out.println("방 입장~~~~~~~~~~~~~~~~~~~~~~~~~~");
            chatRoomRepository.enterChatRoom(message.getRoomId());
            message.setMessage(message.getSender() + "님이 입장하셨습니다.");
        }
        

        redisPublisher.publish(message);
    }
    
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
    
    @PostMapping("/chat/{crewNo}/{userNo}")
    public ResponseEntity<Message> chatAdd(@PathVariable("crewNo") Long crewNo, @PathVariable("userNo") Long userNo, @RequestBody ChatVo chatVo) {
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
