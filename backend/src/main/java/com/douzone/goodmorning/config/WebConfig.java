package com.douzone.goodmorning.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.douzone.goodmorning.security.LoginInterceptor;


@SpringBootConfiguration
public class WebConfig implements WebMvcConfigurer {
	
	@Autowired
	private Environment env;
	
	// Security Interceptors
	@Bean
	public HandlerInterceptor loginInterceptor() {
		return new LoginInterceptor();
	}
	
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		// Security Interceptors
		registry
			.addInterceptor(loginInterceptor())
			.addPathPatterns("/api/user/signIn");
		
	}
}
