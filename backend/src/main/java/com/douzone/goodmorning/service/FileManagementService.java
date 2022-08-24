package com.douzone.goodmorning.service;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.douzone.goodmorning.repository.ChannelRepository;
import com.douzone.goodmorning.repository.CrewRepository;
import com.douzone.goodmorning.repository.FileManagementRepository;
import com.douzone.goodmorning.repository.UserRepository;
import com.douzone.goodmorning.repository.VerificationTokenRepository;
import com.douzone.goodmorning.vo.FileManagementVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FileManagementService {
	
	private final FileManagementRepository fileManagementRepository;
	
	public void addFile(FileManagementVo fileManagementVo) {
		fileManagementRepository.insert(fileManagementVo);
	}

	public FileManagementVo getFile(String filename) {
		// TODO Auto-generated method stub
		return fileManagementRepository.findFile(filename);
	}
	
}
