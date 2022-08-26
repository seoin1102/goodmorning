package com.douzone.goodmorning.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.douzone.goodmorning.dto.JsonResult;
import com.douzone.goodmorning.service.FileManagementService;
import com.douzone.goodmorning.service.FileUploadService;
import com.douzone.goodmorning.service.UserService;
import com.douzone.goodmorning.vo.FileManagementVo;
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
		String file = "/assets/file/" + filename;
		FileManagementVo fileManagementVo =fileManagementService.getFile(file);
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(fileManagementVo));
	}
	
	@PostMapping("/upload")
	public ResponseEntity<JsonResult> upload(@RequestParam("file") MultipartFile file, FileManagementVo fileManagementVo) {
		fileManagementVo.setUrl(FileUploadService.restoreImage(file));
		fileManagementService.addFile(fileManagementVo); 
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(fileManagementVo));
	}
	
	
	
}
