package com.realestate.response;

public class MessageResponse {

	private String message;
	
	public MessageResponse() {
		// TODO Auto-generated constructor stub
	}
	
	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	@Override
	public String toString() {
		return "MessageResponse [message=" + message + "]";
	}

	public MessageResponse(String message) {
		super();
		this.message = message;
	}

}
