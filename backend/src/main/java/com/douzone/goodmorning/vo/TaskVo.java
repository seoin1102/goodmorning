package com.douzone.goodmorning.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TaskVo {
	private Long id;
	private Long projectNo;
	private String title;
	private String start;
	private String end;
	private String status;
<<<<<<< HEAD
	private Long userNo;
	private Long crewNo;
=======
	private String userName;
	private Long userNo;
	private Long crewNo;
	private String projectName;
	private String color;
>>>>>>> d3619909f30f29004bd62c55fe23b397f8f90b1f

}
