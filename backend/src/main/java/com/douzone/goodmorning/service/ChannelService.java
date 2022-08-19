package com.douzone.goodmorning.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.douzone.goodmorning.repository.ChannelRepository;
import com.douzone.goodmorning.vo.ChannelVo;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ChannelService {
	private final ChannelRepository channelRepository;
	
	public List<ChannelVo> getChannel(Long channelNo, Long userNo) {
		return channelRepository.findAll(channelNo, userNo);
	}

	public Boolean addChannel(ChannelVo channelVo) {
		return channelRepository.insert(channelVo);
	}

	public Object getFirstChannel(Long userNo) {
		return channelRepository.findFirst(userNo);
	}

}
