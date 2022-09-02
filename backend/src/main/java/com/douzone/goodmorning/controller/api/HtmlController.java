package com.douzone.goodmorning.controller.api;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.charset.Charset;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.reactive.function.client.WebClient;

import com.douzone.goodmorning.dto.LinkPreviewDto;
import com.douzone.goodmorning.dto.Message;
import com.douzone.goodmorning.dto.status.StatusEnum;
import com.douzone.goodmorning.vo.CrewVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/html")
@RequiredArgsConstructor
public class HtmlController {
	
//    @PostMapping(path="/test", produces=MediaType.TEXT_HTML_VALUE)
//    public  String test(@RequestBody LinkPreviewDto linkPreviewDto) throws Exception {
//    	Document doc = null;
//    	try {
//    		doc = Jsoup.connect(linkPreviewDto.getUrl()).get();
//    	} catch (IOException e) {
//    		return "false";
//    	}
//           
//    	return doc.toString();
//    }
    
    @PostMapping("/github")
    public  ResponseEntity<Message> getHtml(@RequestBody LinkPreviewDto linkPreviewDto) throws Exception {
    	    	
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	
    	Message message = new Message();
    	message.setStatus(StatusEnum.OK);
    	message.setMessage("success");
    	
    	Document doc = null;

    	try {
    		doc = Jsoup.connect("https://github.com/"+linkPreviewDto.getGitId()+"/"+linkPreviewDto.getProjectName()).get();
    	} catch (MalformedURLException e) {
    		message.setMessage("fail");
    		return ResponseEntity.ok().headers(headers).body(message);
    	}
    	
    	message.setData(doc.toString());

    	return ResponseEntity.ok().headers(headers).body(message);
    }
}
