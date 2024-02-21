package com.realestate.response;

import com.realestate.entity.UserAgent;

public class ProfileResponse {
	
	private String message;
	
	private boolean success;
	
	private UserAgent userAgent;

	public ProfileResponse() {
		// TODO Auto-generated constructor stub
	}
	
	public ProfileResponse(String message, boolean success, UserAgent userAgent) {
		super();
		this.message = message;
		this.success = success;
		this.userAgent = userAgent;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
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

	@Override
	public String toString() {
		return "ProfileResponse [message=" + message + ", success=" + success + ", userAgent=" + userAgent + "]";
	}
	
	
}
