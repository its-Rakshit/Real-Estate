package com.realestate.response;

import java.util.List;

import com.realestate.entity.Property;

public class PropertyResponse {

	private String message;

	private boolean success;

	private List<Property> property;

	private Property prop;

	public PropertyResponse() {

	}

	public List<Property> getProperty() {
		return property;
	}

	public void setProperty(List<Property> property) {
		this.property = property;
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

	public PropertyResponse(String message, boolean success, List<Property> property, Property prop) {
		super();
		this.message = message;
		this.success = success;
		this.property = property;
		this.prop = prop;
	}

	@Override
	public String toString() {
		return "PropertyResponse [message=" + message + ", success=" + success + ", property=" + property + ", prop="
				+ prop + "]";
	}

	public Property getProp() {
		return prop;
	}

	public void setProp(Property prop) {
		this.prop = prop;
	}

}
