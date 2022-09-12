package com.douzone.goodmorning.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.douzone.goodmorning.dto.JsonResult;
import com.douzone.goodmorning.service.FileManagementService;
import com.douzone.goodmorning.service.FileUploadService;
import com.douzone.goodmorning.service.UserService;
import com.douzone.goodmorning.vo.FileManagementVo;
import com.douzone.goodmorning.vo.UserVo;
import com.fasterxml.jackson.annotation.JacksonInject.Value;

import lombok.RequiredArgsConstructor;



@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = {"*"})
@RequestMapping("/api/fileManagement")
public class FileManagementController {
	
	
	private final FileUploadService FileUploadService;
	
	private final FileManagementService fileManagementService;

	@PostMapping("/download/{filename}")
	public ResponseEntity<JsonResult> index(@PathVariable("filename") String filename) {
		System.out.println("들어온지 테스트 " + filename);
		String file = "/assets/" + filename;
		FileManagementVo fileManagementVo =fileManagementService.getFile(file);
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(fileManagementVo));
	}
	
	@PostMapping("/upload")
	public ResponseEntity<JsonResult> upload(@RequestParam("file") MultipartFile file, FileManagementVo fileManagementVo) {
		fileManagementVo.setUrl(FileUploadService.restoreImage(file));
		fileManagementVo.setOriginFileName(file.getOriginalFilename());
		fileManagementService.addFile(fileManagementVo); 
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(fileManagementVo));
	}
	

	@PostMapping("/fileshareDirectory")
	public ResponseEntity<JsonResult> getProjectName(@RequestBody FileManagementVo fileManagementVo) {
		List<FileManagementVo> list =fileManagementService.findProjectName(fileManagementVo); 
		int count = fileManagementService.findProjectCount(fileManagementVo);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("count", count);
		map.put("data",list);
		//System.out.println(map);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(map));
	}
	
	@PostMapping("/fileshareFile")
	public ResponseEntity<JsonResult> getProjectFileList(@RequestBody FileManagementVo fileManagementVo) {
		List<FileManagementVo> list =fileManagementService.findFileList(fileManagementVo); 
		int count = fileManagementService.findFileCount(fileManagementVo);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("count", count);
		map.put("data",list);
		//System.out.println(map);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(map));
	}
	
	@PostMapping("/delete")
	public ResponseEntity<JsonResult> upload(@RequestBody FileManagementVo fileManagementVo) {
		int result = fileManagementService.deleteFile(fileManagementVo); 
		if(result==-1) {
			return ResponseEntity.status(HttpStatus.OK).body(JsonResult.fail("삭제 실패")); 
		}
		
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(fileManagementVo));
	}
	
	@PostMapping("/uploadAndFindFileList")
	public ResponseEntity<JsonResult> uploadAndFindFileList(@RequestParam("file") MultipartFile file,FileManagementVo fileManagementVo) {
		String fileurl = FileUploadService.restoreImage(file);
		fileManagementVo.setUrl(fileurl);
		fileManagementVo.setOriginFileName(file.getOriginalFilename());
		
		List<FileManagementVo> list =fileManagementService.addFileAndFindFileList(fileManagementVo); 
		int count = fileManagementService.findFileCount(fileManagementVo);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("count", count);
		map.put("data",list);
		map.put("fileurl",fileurl);
		
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(map));
	}
	
	
	@PostMapping("/editProfileImg")
	public ResponseEntity<JsonResult> profileUpload(@RequestParam("file") MultipartFile file, UserVo userVo) {
		System.out.println("여기 들어온지 확인용");
		userVo.setProfileUrl(FileUploadService.restoreImage(file));
		userVo=fileManagementService.profileUpdateAndFindProfileUrl(userVo);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(userVo));
	}
	
	
	@PostMapping("/profileImg")
	public ResponseEntity<JsonResult> profileImg(@RequestBody UserVo userVo) {
		userVo=fileManagementService.findProfileUrl(userVo);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(userVo));
	}

	
		
}
