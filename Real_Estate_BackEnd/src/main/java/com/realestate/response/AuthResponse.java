package com.realestate.response;

import com.realestate.entity.UserAgent;

public class AuthResponse {
	private String jwt;

	private String message;

	private boolean success;

	private UserAgent userAgent;

	public AuthResponse() {

	}
	
	public AuthResponse(String jwt, String message, boolean success, UserAgent userAgent) {
		super();
		this.jwt = jwt;
		this.message = message;
		this.success = success;
		this.userAgent = userAgent;
	}



	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	
	public UserAgent getUserAgent() {
		return userAgent;
	}

	public void setUserAgent(UserAgent userAgent) {
		this.userAgent = userAgent;
	}

	public String getJwt() {
		return jwt;
	}

	public void setJwt(String jwt) {
		this.jwt = jwt;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}
