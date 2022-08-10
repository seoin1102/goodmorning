package com.douzone.goodmorning.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ChannelVo {
	private Long no;
	private String name;
	private String discription;
	private String creationDate;
	private Long masterChannelUserNo;
}
