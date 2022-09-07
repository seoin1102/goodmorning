package com.douzone.goodmorning.exception;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.nio.charset.Charset;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import com.douzone.goodmorning.dto.Message;
import com.douzone.goodmorning.dto.status.StatusEnum;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {
	@ExceptionHandler(Exception.class)
	@ResponseBody
	public ResponseEntity<Message> handlerException(Exception e) {
		
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	
		// 1. 로깅(logging)
		StringWriter errors = new StringWriter();
		e.printStackTrace(new PrintWriter(errors));
		log.error(errors.toString());
    	
    	Message message = new Message();
    	message.setStatus(StatusEnum.OK);
    	message.setMessage("global exception");
    	message.setData(errors.toString());
    	
		
		// 2. JSON 응답
		return ResponseEntity.ok().headers(headers).body(message);
	}
}
