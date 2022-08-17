package com.douzone.goodmorning.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.douzone.goodmorning.repository.CrewRepository;
import com.douzone.goodmorning.vo.CrewVo;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CrewService {
	
	private final CrewRepository crewRepository;
	
	public List<CrewVo> getCrew(Long channelNo) {
		return crewRepository.findAll(channelNo);
	}

	public Boolean addCrew(CrewVo crewVo) {
		return crewRepository.insert(crewVo);
		
	}

}
