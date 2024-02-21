package com.realestate.response;

import com.realestate.entity.Property;

public class BasicResponse {

	private String message;

	private Property property;

	public BasicResponse() {
		// TODO Auto-generated constructor stub
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public BasicResponse(String message, Property property) {
		super();
		this.message = message;
		this.property = property;
	}

	@Override
	public String toString() {
		return "BasicResponse [message=" + message + ", property=" + property + "]";
	}

	public Property getProperty() {
		return property;
	}

	public void setProperty(Property property) {
		this.property = property;
	}

}
