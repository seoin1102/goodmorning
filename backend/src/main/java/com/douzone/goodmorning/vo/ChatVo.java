package com.douzone.goodmorning.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ChatVo {
	
    // 메시지 타입 : 입장, 채팅
    public enum MessageType {
        ENTER, CHAT, DM
    }
	
    private MessageType type;
    private Long no;
    private Long crewNo;
    private Long userNo;
    private String sendDate;
    private String message;
}
