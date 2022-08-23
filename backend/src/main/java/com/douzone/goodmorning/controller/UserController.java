package com.douzone.goodmorning.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.goodmorning.dto.JsonResult;
import com.douzone.goodmorning.service.UserService;
import com.douzone.goodmorning.vo.UserVo;
import com.douzone.goodmorning.vo.VerificationTokenVo;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/user")
@RestController
@RequiredArgsConstructor
public class UserController {
	
	private final UserService userService;
	
	@Transactional
	@PostMapping("/signUp")
	public ResponseEntity<JsonResult> singUp(@RequestBody UserVo vo){
		vo.setEnable(false);
		
		int result = userService.signUp(vo);
		if(result==-1) {
			return ResponseEntity.status(HttpStatus.OK).body(JsonResult.fail("중복된 이메일 입니다!")); 
		}
		
		userService.addDefaultChannelAndCrew(vo);

		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success("회원가입 되었습니다 해당 이메일로 확인 메일이 전송되었습니다."));
		
	}
	
	@GetMapping("/mailAuthentication/{email}/{token}")
	public void mailAuthentication(@PathVariable("email") String email, @PathVariable("token") String token, HttpServletResponse response) throws IOException {

		String url = "http://localhost:9090/signin";
		VerificationTokenVo tokenVo = new VerificationTokenVo();
		tokenVo.setEmail(email);
		tokenVo.setToken(token);
		int result =userService.verifyAccount(tokenVo);
		
		if(result == -1) {
			response.sendRedirect(url);
			//return ResponseEntity.status(HttpStatus.OK).body(JsonResult.fail("이메일 인증에 실패했습니다."));
		}
		response.sendRedirect(url);
		//return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success("이메일 인증에 성공했습니다."));
	}
	
	@PostMapping("/signIn")
	public void singIn(){
		//ResponseEntity<JsonResult> 
		// @RequestBody UserVo vo
//		System.out.println(vo);
//		UserVo result = userService.signIn(vo);
//		System.out.println(result);
//		if(result==null) {
//			return ResponseEntity.status(HttpStatus.OK).body(JsonResult.fail("이메일 또는 패스워드가 잘못되었습니다.")); 
//		}
//		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success("로그인 성공했습니다."));
	}
	
	@RequestMapping("/logout")
	public void logout() {
	}
	
	
	@PutMapping("/resetPw")
	public ResponseEntity<JsonResult> resetPw(@RequestBody UserVo vo) {
		
		int result =userService.resetPw(vo);
		
		if(result==0) {
			return ResponseEntity.status(HttpStatus.OK).body(JsonResult.fail("이메일 전송 실패.."));
		}
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success("임시 비밀번호가 해당 메일로 전송되었습니다."));
	}
	

	
	
}
