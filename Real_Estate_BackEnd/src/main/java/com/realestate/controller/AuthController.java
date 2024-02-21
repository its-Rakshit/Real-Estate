package com.realestate.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.realestate.config.JwtProvider;
import com.realestate.entity.UserAgent;
import com.realestate.exception.UserAgentException;
import com.realestate.repository.UserAgentRepository;
import com.realestate.request.LoginRequest;
import com.realestate.response.AuthResponse;
import com.realestate.service.CustomUserAgentServiceImpl;

@RestController
@RequestMapping("/auth")
public class AuthController {

	private UserAgentRepository userAgentRepo;

	private JwtProvider jwtProvider;

	private PasswordEncoder passwordEncoder;

	private CustomUserAgentServiceImpl customUserServiceImplementation;

	public AuthController(UserAgentRepository userAgentRepo, JwtProvider jwtProvider, PasswordEncoder passwordEncoder,
			CustomUserAgentServiceImpl customUserServiceImplementation) {
		super();
		this.userAgentRepo = userAgentRepo;
		this.jwtProvider = jwtProvider;
		this.passwordEncoder = passwordEncoder;
		this.customUserServiceImplementation = customUserServiceImplementation;
	}

	@PostMapping("/saveUser")
	public ResponseEntity<AuthResponse> createUserHandler(@RequestBody UserAgent user) throws UserAgentException {

		String email = user.getEmail();
		String password = user.getPassword();
		String fullName = user.getFullName();
		String phoneNumber = user.getPhoneNumber();
		String addRole = "ROLE_USER";
		
		UserAgent isEmailExist = userAgentRepo.findByEmail(user.getEmail());
		
		AuthResponse authResponse = new AuthResponse();
		
		if (isEmailExist != null) {
			authResponse.setMessage("Email is Already Used with another account");
			authResponse.setSuccess(false); 
			return new ResponseEntity<>(authResponse, HttpStatus.BAD_REQUEST);
		}
		UserAgent addUser = new UserAgent();
		addUser.setEmail(email);
		addUser.setPassword(passwordEncoder.encode(password));
		addUser.setFullName(fullName);
		addUser.setPhoneNumber(phoneNumber);
		addUser.setRole(addRole);

		UserAgent savedUser = userAgentRepo.save(addUser);

		Authentication authentication = new UsernamePasswordAuthenticationToken(savedUser.getEmail(),
				savedUser.getPassword());

		SecurityContextHolder.getContext().setAuthentication(authentication);

		String token = jwtProvider.generateToken(authentication);

		//AuthResponse authResponse = new AuthResponse();
		authResponse.setJwt(token);
		authResponse.setMessage("Account Created Successfully");
		authResponse.setSuccess(true);
		
		return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.CREATED);
	}

	@PostMapping("/saveAgent")
	public ResponseEntity<AuthResponse> createAgentHandler(@RequestBody UserAgent agent) throws UserAgentException {

		String email = agent.getEmail();
		String password = agent.getPassword();
		String fullName = agent.getFullName();
		String phoneNumber = agent.getPhoneNumber();
		String addRole = "ROLE_AGENT";

		UserAgent isEmailExist = userAgentRepo.findByEmail(agent.getEmail());
		
		AuthResponse authResponse = new AuthResponse();
		
		if (isEmailExist != null) {
			authResponse.setMessage("Email is Already Used with another account");
			authResponse.setSuccess(false); 
			return new ResponseEntity<>(authResponse, HttpStatus.BAD_REQUEST);
		}
		UserAgent addAgent = new UserAgent();
		addAgent.setEmail(email);
		addAgent.setPassword(passwordEncoder.encode(password));
		addAgent.setFullName(fullName);
		addAgent.setPhoneNumber(phoneNumber);
		addAgent.setRole(addRole);

		UserAgent savedAgent = userAgentRepo.save(addAgent);

		Authentication authentication = new UsernamePasswordAuthenticationToken(savedAgent.getEmail(),
				savedAgent.getPassword());

		SecurityContextHolder.getContext().setAuthentication(authentication);

		String token = jwtProvider.generateToken(authentication);

		
		authResponse.setJwt(token);
		authResponse.setMessage("Account Created Successfully");
		authResponse.setSuccess(true);
		
		return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.CREATED);
	}

	@PostMapping("/signin")
	public ResponseEntity<AuthResponse> loginUserHandler(@RequestBody LoginRequest loginRequest) {

		String username = loginRequest.getEmail();

		String password = loginRequest.getPassword();

		Authentication authentication = authenticate(username, password);

		SecurityContextHolder.getContext().setAuthentication(authentication);

		String token = jwtProvider.generateToken(authentication);
		
		UserAgent userAgent = userAgentRepo.findByEmail(username);
		
		AuthResponse authResponse = new AuthResponse();
		authResponse.setJwt(token);
		authResponse.setMessage("Login Successfullyy");
		authResponse.setUserAgent(userAgent);
		authResponse.setSuccess(true);

		return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.CREATED);
	}

	private Authentication authenticate(String username, String password) {
		UserDetails userAgentDetails = customUserServiceImplementation.loadUserByUsername(username);

		if (userAgentDetails == null) {
			throw new BadCredentialsException("Invalid Email Id...");
		}

		if (!passwordEncoder.matches(password, userAgentDetails.getPassword())) {
			throw new BadCredentialsException("Invalid Password for email id" + userAgentDetails.getUsername());
		}

		System.out.println(userAgentDetails);
		return new UsernamePasswordAuthenticationToken(userAgentDetails, null, userAgentDetails.getAuthorities());
	}

}
