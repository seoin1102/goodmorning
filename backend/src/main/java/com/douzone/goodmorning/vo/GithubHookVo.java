package com.douzone.goodmorning.vo;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@RequiredArgsConstructor
@Getter
@ToString
public class GithubHookVo {
	private int no;
	private String eventType;
	private String userName;
	private String message;
	private String date;
	private int projectNo;
}
