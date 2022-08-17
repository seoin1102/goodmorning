package com.douzone.goodmorning.vo;



import java.security.NoSuchAlgorithmException;

import com.douzone.goodmorning.security.SHA256;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@RequiredArgsConstructor
@Getter
@ToString
public class UserVo {
	private int no;
	private String email;
	private String name;
	private String passwd;
	private String singUpDate;
	private boolean enable;
	
	
	public void setNo(int no) {
		this.no = no;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	public void setPasswd(String passwd) {
		SHA256 sha256 = new SHA256();	
		try {
			this.passwd = sha256.encrypt(passwd);
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}	
	}
	
	public void setEnable(boolean enable) {
		this.enable = enable;
	}
	public void setSingUpDate(String singUpDate) {
		this.singUpDate = singUpDate;
	}
	
	
   
}
