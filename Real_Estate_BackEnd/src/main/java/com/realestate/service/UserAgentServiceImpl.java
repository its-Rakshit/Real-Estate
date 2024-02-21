package com.realestate.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.realestate.config.JwtProvider;
import com.realestate.entity.UserAgent;
import com.realestate.exception.UserAgentException;
import com.realestate.repository.UserAgentRepository;

@Service
public class UserAgentServiceImpl implements UserAgentService {

	@Autowired
	private UserAgentRepository userAgentRepository;

	@Autowired
	private JwtProvider jwtProvider;

	public UserAgentServiceImpl() {
	}

	@Override
	public UserAgent findByUserById(int id) throws UserAgentException {
		return userAgentRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
	}

	@Override
	public UserAgent findProfileByJwt(String jwt) throws UserAgentException {
		String email = jwtProvider.getEmailFromToken(jwt);

		UserAgent userAgent = userAgentRepository.findByEmail(email);

		if (userAgent == null) {
			throw new UserAgentException("User Not Found with Email");
		} else {
			return userAgent;
		}
	}

	@Override
	public UserAgent findByAgentById(int id) throws UserAgentException {
		return userAgentRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Agent not found with Id:" + id));
	}

	}
