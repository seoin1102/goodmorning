package com.douzone.goodmorning.controller;

import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.douzone.goodmorning.security.Auth;
import com.douzone.goodmorning.service.RedisPublisher;
import com.douzone.goodmorning.service.RedisSubscriber;
import com.douzone.goodmorning.vo.ChatVo;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Controller
public class ChatController {

    private final RedisPublisher redisPublisher;
    private final RedisSubscriber redisSubscriber;
    private final RedisMessageListenerContainer redisMessageListener;

    /**
     * websocket "/pub/chat/message"로 들어오는 메시징을 처리한다.
     */
//    @MessageMapping("/chat/message")
//    public void message(ChatMessage message) {
//    	 System.out.println("메시지 전체내용~~~~~~~~~~~~~~~~~" + ":" + message);
//    	
//        if (ChatMessage.MessageType.ENTER.equals(message.getType())) {
//        	System.out.println("방 입장~~~~~~~~~~~~~~~~~~~~~~~~~~");
//            chatRoomRepository.enterChatRoom(message.getRoomId());
//            message.setMessage(message.getSender() + "님이 입장하셨습니다.");
//        }
//        
//
//        redisPublisher.publish(message);
//    }
    
//    @ResponseBody
//    @PostMapping("/chat/test")
//    public void test(@RequestBody ChatVo chatVo) {	
//    	
//    	String topic = Long.toString(chatVo.getCrewNo());
//    	System.out.println("토픽값:" + topic);
//    	
//
//    	if(ChatVo.MessageType.CHAT.equals(chatVo.getType())) 
//    		redisPublisher.publish(topic, chatVo);
//    }
//    
    
    @MessageMapping("/chat")
    public void message(@RequestBody ChatVo chatVo) {
    	
    	String topic = Long.toString(chatVo.getCrewNo());
    	System.out.println("토픽값:" + topic);
    	
    	// 0번. [CONNECT]일 경우 메시지 리스너 등록
    	if(ChatVo.MessageType.CONNECT.equals(chatVo.getType())) {
    		redisMessageListener.addMessageListener(redisSubscriber, new ChannelTopic(topic));
    	}
    	// 1번. [CHAT]일 경우 클라이언트 => 서버로 전달
    	if(ChatVo.MessageType.CHAT.equals(chatVo.getType())) 
    		redisPublisher.publish(topic, chatVo);
    }
}
