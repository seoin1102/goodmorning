package com.douzone.goodmorning.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.douzone.goodmorning.repository.ChannelRepository;
import com.douzone.goodmorning.vo.ChannelVo;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ChannelService {
	private ChannelRepository channelRepository;
	public List<ChannelVo> getChannel(Long userNo) {
		return channelRepository.findAll(userNo);
	}

}
