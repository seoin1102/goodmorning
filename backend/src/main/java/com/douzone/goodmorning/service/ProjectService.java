package com.douzone.goodmorning.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import org.jasypt.commons.CommonUtils;
import org.springframework.stereotype.Service;

import com.douzone.goodmorning.repository.ProjectRepository;
import com.douzone.goodmorning.repository.TaskRepository;
import com.douzone.goodmorning.vo.ProjectVo;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ProjectService {
	private final ProjectRepository projectRepository;
	private final TaskRepository taskRepository;

	public List<ProjectVo> getProject(Long crewNo) {
		return projectRepository.findAll(crewNo);
	}
	
	public Boolean updateProject(ProjectVo projectVo) {
		return projectRepository.update(projectVo);
	}

	public Boolean addProject(ProjectVo projectVo) {
		return projectRepository.insert(projectVo);
	}

	public Boolean deleteProject(Long id) {
		taskRepository.delete(id);
		return projectRepository.delete(id);

	}
	
	
public void execGit(String cmd){
		String giturl = "C:\\Program Files\\Git\\git-cmd.exe";
		String testurl = "C:\\Program Files\\Oracle\\VirtualBox\\VirtualBox.exe";
		Runtime rt = Runtime.getRuntime();
		Process pc = null;
		StringBuffer successOutput = new StringBuffer();
		StringBuffer errorOutPut = new StringBuffer();
		BufferedReader successBufferReader = null;
		BufferedReader errorBufferReader = null;
		String msg = null;

		List<String> cmdList = new ArrayList<String>();
		
		//윈도우 리눅스 구분용 앱서버에서 돌릴때 리눅스 사용
		if(System.getProperty("os.name").indexOf("Windows")>-1) {
			cmdList.add("cmd");
			cmdList.add("/c");
		}else {
			cmdList.add("/bin/sh");
			cmdList.add("-c");
		}
		
		//명령어 셋팅
		cmdList.add(cmd);
		String[] array = cmdList.toArray(new String[cmdList.size()]);
		
		try {
			//명령어 실행 
			pc=rt.exec(array);
			// shell 실행이 성공했을때 
			successBufferReader = new BufferedReader(new InputStreamReader(pc.getInputStream(),"EUC-KR"));
			while((msg=successBufferReader.readLine()) != null) {
				successOutput.append(msg+System.getProperty("line.separator"));
				//errorOutPut.append(msg+System.getProperty("line.separator"));
			}
			
			// shell 실행시 에러가 발생했을 때 
			errorBufferReader = new BufferedReader(new InputStreamReader(pc.getErrorStream(),"EUC-KR"));
			while((msg=errorBufferReader.readLine()) != null) {
				errorOutPut.append(msg+System.getProperty("line.separator"));
			}
			
			// 프로세스의 수행이 끝날때까지 대기 
			pc.waitFor();
			
			
			//제대로 됬는지 확인용
			if(pc.exitValue()==0) {
				//정상종료 처리 
				System.out.println("성공");
				System.out.println(successOutput.toString());
			}else {
				//비정상 종료 
				System.out.println("비정상적으로 종료되었습니다!");
				System.out.println(successOutput.toString());
			}
			
			if(CommonUtils.isNotEmpty(errorOutPut.toString())) {
				System.out.println("오류");
				System.out.println(successOutput.toString());
			}
		}catch(Exception e) {
			e.printStackTrace();
		}finally {
			try {
				pc.waitFor();
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			pc.destroy();
			if(successBufferReader != null)
				try {
					successBufferReader.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			if(errorBufferReader != null) {
				try {
					errorBufferReader.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
	}

}
