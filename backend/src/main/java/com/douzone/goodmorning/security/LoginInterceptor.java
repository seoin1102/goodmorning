package com.douzone.goodmorning.security;

import java.io.OutputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;

import com.douzone.goodmorning.dto.JsonResult;
import com.douzone.goodmorning.service.UserService;
import com.douzone.goodmorning.vo.UserVo;
import com.fasterxml.jackson.databind.ObjectMapper;

public class LoginInterceptor implements HandlerInterceptor {
	
	@Autowired
	private UserService userService;
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			
			throws Exception {
		SHA256 sha256 =  new SHA256();
		System.out.println("테테스트");
		String email = request.getParameter("email");
		String passwd = request.getParameter("passwd");

		response.setContentType("application/json");
		UserVo authUser = userService.getUser(email, passwd);
		
		
		System.out.println(authUser);
		
		if(authUser == null) {
			request.setAttribute("email", email);
			request.setAttribute("result", "fail");
			//request.getRequestDispatcher("/WEB-INF/views/user/login.jsp").forward(request, response);
			
			// 3. json 응답
			response.setStatus(HttpServletResponse.SC_OK);
		
			JsonResult jsonResult = JsonResult.fail("이메일 또는 패스워드가 잘못되었습니다.");
			String jsonString = new ObjectMapper().writeValueAsString(jsonResult);
			
			OutputStream os = response.getOutputStream();
			os.write(jsonString.getBytes("UTF-8"));
			os.close();
			
			return false;
		}

		/* session 처리 */
		System.out.println(authUser);
		HttpSession session = request.getSession(true);
		session.setAttribute("authUser", authUser);
		
		// 3. json 응답
		response.setStatus(HttpServletResponse.SC_OK);

		JsonResult jsonResult = JsonResult.success(authUser);
		String jsonString = new ObjectMapper().writeValueAsString(jsonResult);

		OutputStream os = response.getOutputStream();
		os.write(jsonString.getBytes("UTF-8"));
		os.close();
		
		return true;
	}
}
