package com.realestate.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.realestate.entity.UserAgent;
import com.realestate.repository.UserAgentRepository;

@Service
public class CustomUserAgentServiceImpl implements UserDetailsService {

	@Autowired
	private UserAgentRepository userAgentRepo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UserAgent userAgentAdd = userAgentRepo.findByEmail(username);

		if (userAgentAdd == null) {
			throw new UsernameNotFoundException("User or Agent Not Found with the Email:" + username);
		}
		List<GrantedAuthority> authorities = new ArrayList<>();

		return new org.springframework.security.core.userdetails.User(userAgentAdd.getEmail(),
				userAgentAdd.getPassword(), authorities);
	}

}
