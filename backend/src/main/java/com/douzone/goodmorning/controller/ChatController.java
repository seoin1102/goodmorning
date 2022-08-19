package com.douzone.goodmorning.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

import com.douzone.goodmorning.repository.ChatRoomRepository;
import com.douzone.goodmorning.service.RedisPublisher;
import com.douzone.goodmorning.vo.ChatMessage;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
//@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ChatController {

    private final RedisPublisher redisPublisher;
    private final ChatRoomRepository chatRoomRepository;

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
}
