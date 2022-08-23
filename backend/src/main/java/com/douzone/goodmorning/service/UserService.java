package com.douzone.goodmorning.service;


import java.security.NoSuchAlgorithmException;
import java.util.UUID;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.douzone.goodmorning.repository.ChannelRepository;
import com.douzone.goodmorning.repository.CrewRepository;
import com.douzone.goodmorning.repository.UserRepository;
import com.douzone.goodmorning.repository.VerificationTokenRepository;
import com.douzone.goodmorning.security.SHA256;
import com.douzone.goodmorning.util.MailUtil;
import com.douzone.goodmorning.vo.ChannelVo;
import com.douzone.goodmorning.vo.CrewVo;
import com.douzone.goodmorning.vo.UserVo;
import com.douzone.goodmorning.vo.VerificationTokenVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
	

	private final UserRepository userRepository;
	private final ChannelRepository channelRepository;
	private final CrewRepository crewRepository;
	private final VerificationTokenRepository verificationTokenRepository;
	private final JavaMailSender mailSender;

	@Transactional
	public int signUp(UserVo vo){
		
		if(userRepository.existsById(vo) != null) {
			return -1;
		}
		
		vo.setEnable(false);
		userRepository.insert(vo);
		
		VerificationTokenVo verificationTokenVo =new VerificationTokenVo();
		
		String token = generateVerificationToken(vo);
		
		String setSubject ="[굿모닝 이메일 인증메일 입니다.]";
		String setText = "<h1>메일인증</h1>" +
				"<br/>"+vo.getName()+"님 "+
				"<br/>굿모닝에 회원가입해주셔서 감사합니다."+
				"<br/>아래 [이메일 인증 확인]을 누르면 이메일 인증이 완료됩니다.<br/>"+
				"<a href='http://localhost:9090/api/user/mailAuthentication/" + vo.getEmail() +
				"/" + token +
				"' target='_blenk'>이메일 인증 확인</a>";
		
		sendmail(setSubject,setText,vo);
		
		return 1;
		
	}

	public UserVo signIn(UserVo vo) {
		
		return userRepository.findByEmailAndPassword(vo);
		
	}

	public UserVo getUser(String email, String password) {
		
		UserVo vo =  new UserVo();
		vo.setEmail(email);
		vo.setPasswd(password);

		return userRepository.findByEmailAndPassword(vo);
		
	}

	
    private String generateVerificationToken(UserVo vo) {
        String token = UUID.randomUUID().toString();
        VerificationTokenVo verificationToken = new VerificationTokenVo();
        verificationToken.setToken(token);
        verificationToken.setEmail(vo.getEmail());
        verificationTokenRepository.insert(verificationToken);
        return token;
    }
    
    @Transactional
	public int verifyAccount(VerificationTokenVo vo) {
		if(verificationTokenRepository.findByToken(vo)==null) {
			return -1;
		}
		
        return userRepository.updateEnable(vo);
        
	}
	
	@Transactional
	public int resetPw(UserVo vo) {
		SHA256 sha256 = new SHA256();
		
		String token;
		try {
			token = UUID.randomUUID().toString();
			String enctypt_token = sha256.encrypt(token);
			
			String setSubject = "[굿모닝 패스워드 재설정 메일 입니다.]";
			String setText = "<h1>패스워드 재설정 메일</h1>" +
					"<br/>해당 패스워드로 변경이 되었습니다.."+
					"<br/>임시 패스워드로 로그인 하신 후 변경하시면 됩니다.<br/>"+
					"임시 패스워드 : "+ token;
			
			sendmail(setSubject, setText, vo);
			
			return userRepository.updatePw(vo.getEmail(),enctypt_token);
			
			
		} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	

		return 0;

		
	}
	
	
	public void sendmail(String setSubject, String setText, UserVo vo) {
		
		try {
			MailUtil sendMail = new MailUtil(mailSender);
			
			sendMail.setSubject(setSubject); //메일제목
			sendMail.setText(setText);
			
			sendMail.setFrom("choisichang13@gmail.com", "choisichang");
			sendMail.setTo(vo.getEmail());
			sendMail.start();
			
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void addDefaultChannelAndCrew(UserVo vo) {
		ChannelVo channelVo = new ChannelVo();
		channelVo.setName(vo.getName() + "채널");
		channelVo.setDescription(vo.getName() + "의 채널 입니다.");
		channelVo.setMasterChannelUserNo(Long.valueOf(vo.getNo()));
		channelRepository.insert(channelVo);
		Long channelNo = channelRepository.findByMasterChannelUserNo(Long.valueOf(vo.getNo()));
		channelRepository.addChannelUser(channelVo.getMasterChannelUserNo(), channelNo);
		
		CrewVo crewVo = new CrewVo();
		crewVo.setName(vo.getName() + "의 크루");
		crewVo.setMasterCrewUserNo(Long.valueOf(vo.getNo()));
		crewVo.setChannelNo(channelNo);
		crewRepository.insert(crewVo);
		
		Long crewNo = crewRepository.findMaster(channelNo, Long.valueOf(vo.getNo()));
		crewRepository.addCrewUser(crewNo, Long.valueOf(vo.getNo()));
		
		
		
	}
}
