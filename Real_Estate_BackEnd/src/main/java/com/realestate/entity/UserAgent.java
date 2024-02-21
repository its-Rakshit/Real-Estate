package com.realestate.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class UserAgent {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int userAgentId;

	private String fullName;

	private String password;

	private String email;

	private String role;

	private String phoneNumber;

	public UserAgent() {
		// TODO Auto-generated constructor stub
	}

	public int getUserAgentId() {
		return userAgentId;
	}

	public void setUserAgentId(int userAgentId) {
		this.userAgentId = userAgentId;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public UserAgent(int userAgentId, String fullName, String password, String email, String role, String phoneNumber) {
		super();
		this.userAgentId = userAgentId;
		this.fullName = fullName;
		this.password = password;
		this.email = email;
		this.role = role;
		this.phoneNumber = phoneNumber;
	}

	@Override
	public String toString() {
		return "UserAgent [userAgentId=" + userAgentId + ", fullName=" + fullName + ", password=" + password
				+ ", email=" + email + ", role=" + role + ", phoneNumber=" + phoneNumber + "]";
	}

}
