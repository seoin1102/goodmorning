package com.douzone.goodmorning.service;

import java.util.List;

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
		
		return fileManagementRepository.findFile(filename);
	}

	public List<FileManagementVo> findProjectName(FileManagementVo fileManagementVo) {
		
		return fileManagementRepository.findProjectName(fileManagementVo);
	}

	public int findProjectCount(FileManagementVo fileManagementVo) {
		
		return fileManagementRepository.findPorjectCount(fileManagementVo);
	}

	public List<FileManagementVo> findFileList(FileManagementVo fileManagementVo) {

		return fileManagementRepository.findFileList(fileManagementVo);
	}

	public int findFileCount(FileManagementVo fileManagementVo) {
		return fileManagementRepository.findFileCount(fileManagementVo);
	}

	public int deleteFile(FileManagementVo fileManagementVo) {
		return fileManagementRepository.updateEnable(fileManagementVo);
	}
	
}
