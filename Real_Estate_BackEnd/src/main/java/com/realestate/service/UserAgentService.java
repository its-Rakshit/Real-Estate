package com.realestate.service;

import com.realestate.exception.UserAgentException;
import com.realestate.entity.UserAgent;

public interface UserAgentService {

	public UserAgent findByUserById(int id) throws UserAgentException;
	
	public UserAgent findByAgentById(int id) throws UserAgentException;

	public UserAgent findProfileByJwt(String jwt) throws UserAgentException;
}
