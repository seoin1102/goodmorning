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
	
	public List<CrewVo> getCrew(Long channelNo, Long userNo) {
		return crewRepository.findAll(channelNo, userNo);
	}

	public Boolean addCrew(CrewVo crewVo) {
		return crewRepository.insert(crewVo);
		
	}


	public Long findMaster(Long channelNo, Long userNo) {
		return crewRepository.findMaster(channelNo, userNo);
		
	}

	public void addCrewUser(Long masterNo, Long userNo) {
		crewRepository.addCrewUser(masterNo, userNo);
		
	}

	// crew_user 관련 서비스
	public List<CrewVo> getCrewUser(Long no) {
		return crewRepository.findCrewUser(no);
	}

}
