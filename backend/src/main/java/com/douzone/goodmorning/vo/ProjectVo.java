package com.douzone.goodmorning.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProjectVo {
	private Long no;
	private String projectName;
	private String start;
	private String end;
	private String description;
	private String status;

}
