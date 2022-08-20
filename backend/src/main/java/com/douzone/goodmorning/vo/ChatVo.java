package com.douzone.goodmorning.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ChatVo {
    private Long no;
    private Long crewNo;
    private Long userNo;
    private String sendDate;
    private String message;
}
