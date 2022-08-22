package com.douzone.goodmorning.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.douzone.goodmorning.repository.ChatRepository;
import com.douzone.goodmorning.vo.ChatVo;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ChatService {
	private final ChatRepository chatRepository;
	
	public List<ChatVo> getMessageList(Long crewNo) {
		return chatRepository.findAllByCrewNo(crewNo);
	}

	public Boolean AddMessage(ChatVo chatVo) {
		return chatRepository.insertByCrewNoAndUserNo(chatVo);
	}

}
