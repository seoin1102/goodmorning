package com.douzone.goodmorning.vo;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@RequiredArgsConstructor
@Getter
@Setter
@ToString
public class VerificationTokenVo {
	private String token;
	private String email;
}
