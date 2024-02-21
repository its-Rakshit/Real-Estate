package com.realestate.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.realestate.entity.UserAgent;

public interface UserAgentRepository extends JpaRepository<UserAgent, Integer>{
	
	public UserAgent findByEmail(String email);
}
