package com.realestate.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.realestate.entity.Property;
import com.realestate.entity.UserAgent;
import com.realestate.exception.UserAgentException;
import com.realestate.response.ProfileResponse;
import com.realestate.response.PropertyResponse;
import com.realestate.service.PropertyService;
import com.realestate.service.UserAgentService;

@RestController
@RequestMapping("/api/user")
public class UserController {

	// eyJhbGciOiJIUzM4NCJ9.eyJpYXQiOjE3MDc4ODIzNTYsImV4cCI6MTcwODcyODM1NiwiZW1haWwiOiJkZW1vMUBnbWFpbC5jb20ifQ.IL4Ql1kFNTLHGToq-HVpxP1fjU2nK17JB9WQxzMe4rmaEonpjl8_nV-nZokTm_Rr
	// eyJhbGciOiJIUzM4NCJ9.eyJpYXQiOjE3MDc4ODQxNTgsImV4cCI6MTcwODczMDE1OCwiZW1haWwiOiJhZ2VudDJAZ21haWwuY29tIn0.GwjKF0sgPT3WT0CdMJi1G0OpASRZT-nRA4fDejtaA9aZPjT0eR3QweAZPT42B6M-
	
	@Autowired
	private PropertyService propertyService;
	
	@Autowired
	private UserAgentService userAgentService;

	@GetMapping("/profile")
	public ResponseEntity<ProfileResponse> getUserProfileHandler(@RequestHeader("Authorization") String jwt)
			throws UserAgentException {
		ProfileResponse profileResponse = new ProfileResponse();
		
		UserAgent userAgent = userAgentService.findProfileByJwt(jwt);

		if (userAgent.getRole().equals("ROLE_USER")) {
			profileResponse.setMessage("Authorized Successfully for viewing profile..." + userAgent.getEmail());
			profileResponse.setSuccess(true);
			profileResponse.setUserAgent(userAgent);
			return new ResponseEntity<ProfileResponse>(profileResponse, HttpStatus.ACCEPTED);
		} else {
			profileResponse.setMessage("Authorized Failed for viewing profile..." + userAgent.getEmail());
			profileResponse.setSuccess(false);
			profileResponse.setUserAgent(null);
			return new ResponseEntity<ProfileResponse>(profileResponse, HttpStatus.ACCEPTED);
		}

	}
	
	@PostMapping("/viewProperty/{location}")
	public ResponseEntity<PropertyResponse> getPropertyHandlerByLocation(@RequestHeader("Authorization") String jwt,@PathVariable("location") String location) {
		
		PropertyResponse propertyResponse = new PropertyResponse();
		
		List<Property> getPropLoc  = propertyService.getAllPropertiesByLocation(location);
		
		if(getPropLoc.isEmpty()) {
			propertyResponse.setMessage("There is no location added now...." +location);
			propertyResponse.setSuccess(false);
			propertyResponse.setProperty(null);
			return new ResponseEntity<>(propertyResponse, HttpStatus.BAD_REQUEST);
		}else {
			propertyResponse.setMessage("Displaying the Properties from the location: " +location);
			propertyResponse.setSuccess(true);
			propertyResponse.setProperty(getPropLoc);
			return new ResponseEntity<>(propertyResponse, HttpStatus.OK);
		}
		
	}



}
