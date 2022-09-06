package com.douzone.goodmorning.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.douzone.goodmorning.security.Auth;

@Controller
public class LandingController {

	@GetMapping("/favicon.ico")
	@ResponseBody
	public void returnNoFavicon() {
	}
	
	@Auth
	@RequestMapping("")
	public String index() {
		return "index";
	}
	
	@Auth
	@RequestMapping("/signin")
	public String signin() {
		return "index";
	}
