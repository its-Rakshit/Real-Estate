package com.realestate.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.realestate.dto.PropertyFilterDTO;
import com.realestate.entity.Property;
import com.realestate.entity.UserAgent;
import com.realestate.exception.UserAgentException;
import com.realestate.repository.PropertyRepository;
import com.realestate.repository.UserAgentRepository;
import com.realestate.response.BasicResponse;
import com.realestate.response.MessageResponse;
import com.realestate.response.ProfileResponse;
import com.realestate.response.PropertyResponse;
import com.realestate.service.PropertyService;
import com.realestate.service.UserAgentService;

@RestController
@RequestMapping("/api/agent")
public class AgentController {

	@Autowired
	private PropertyService propertyService;

	@Autowired
	private UserAgentService userAgentService;

	@Autowired
	private UserAgentRepository useragentRepo;

	@Autowired
	private PropertyRepository propRepo;

	@GetMapping("/profile")
	public ResponseEntity<ProfileResponse> getUserProfileHandler(@RequestHeader("Authorization") String jwt)
			throws UserAgentException {

		ProfileResponse profileResponse = new ProfileResponse();

		UserAgent userAgent = userAgentService.findProfileByJwt(jwt);

		if (userAgent.getRole().equals("ROLE_AGENT")) {
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

	@PostMapping("/addProperty/{id}")
	public ResponseEntity<PropertyResponse> addPropertyHandler(@RequestHeader("Authorization") String jwt,
			@PathVariable("id") int agentId, @RequestBody Property property) throws UserAgentException {

		PropertyResponse propertyResponse = new PropertyResponse();

		Optional<UserAgent> optionalUserAgent = useragentRepo.findById(agentId);

		UserAgent getAgent = null;

		if (optionalUserAgent.isPresent()) {
			getAgent = optionalUserAgent.get();
		} else {
			propertyResponse.setMessage("Agent with ID " + agentId + " not found");
			propertyResponse.setSuccess(false);
			return new ResponseEntity<>(propertyResponse, HttpStatus.BAD_REQUEST);
		}

		if (getAgent.getRole().equals("ROLE_AGENT")) {

			String agentFullName = getAgent.getFullName();

			property.setUserAgentName(agentFullName);

			String propertyRegId = property.getPropertyRegId();

			System.out.println(propertyRegId);

			boolean valFlag = propertyService.validateRegId(propertyRegId);

			System.out.println(valFlag);

			if (valFlag) {

				boolean checkFlag = propertyService.getPropertyByPropertyRegId(propertyRegId);
				if (!checkFlag) {
					Property addProperty = propertyService.saveProperty(property);

					if (addProperty == null) {
						propertyResponse.setMessage("Property didnt added successfully");
						propertyResponse.setSuccess(false);
						return new ResponseEntity<>(propertyResponse, HttpStatus.BAD_REQUEST);
					} else {
						propertyResponse.setMessage("Property added successfully to the Agent of " + agentFullName);
						propertyResponse.setSuccess(true);
						propertyResponse.setProp(addProperty);
						return new ResponseEntity<>(propertyResponse, HttpStatus.CREATED);
					}

				} else {

					propertyResponse.setMessage("Property already existed..");
					propertyResponse.setSuccess(false);
					return new ResponseEntity<>(propertyResponse, HttpStatus.BAD_REQUEST);

				}

			} else {

				propertyResponse.setMessage("Reg Id didnt matched with REGXXX");
				propertyResponse.setSuccess(false);
				return new ResponseEntity<>(propertyResponse, HttpStatus.BAD_REQUEST);
			}

		} else {

			propertyResponse.setMessage("The Role didnt match our ROLE_AGENT");
			propertyResponse.setSuccess(false);
			return new ResponseEntity<>(propertyResponse, HttpStatus.BAD_REQUEST);
		}

	}

	@PostMapping("/viewProperty/{location}")
	public ResponseEntity<PropertyResponse> getPropertyHandlerByLocation(@RequestHeader("Authorization") String jwt,
			@PathVariable("location") String location) {

		PropertyResponse propertyResponse = new PropertyResponse();

		List<Property> getPropLoc = propertyService.getAllPropertiesByLocation(location);

		if (getPropLoc.isEmpty()) {
			propertyResponse.setMessage("There is no location added now...." + location);
			propertyResponse.setSuccess(false);
			propertyResponse.setProperty(null);
			return new ResponseEntity<>(propertyResponse, HttpStatus.BAD_REQUEST);
		} else {
			propertyResponse.setMessage("Displaying the Properties from the location: " + location);
			propertyResponse.setSuccess(true);
			propertyResponse.setProperty(getPropLoc);
			return new ResponseEntity<>(propertyResponse, HttpStatus.OK);
		}

	}

	@PostMapping("/viewAgentProperty/{agentId}")
	public ResponseEntity<PropertyResponse> getPropertyByAgentId(@PathVariable("agentId") int agentId,
			@RequestHeader("Authorization") String jwt) {
		PropertyResponse propertyResponse = new PropertyResponse();

		Optional<UserAgent> optionalUserAgent = useragentRepo.findById(agentId);

		UserAgent getAgent = null;

		if (optionalUserAgent.isPresent()) {
			getAgent = optionalUserAgent.get();
		} else {
			propertyResponse.setMessage("Agent with ID " + agentId + " not found");
			propertyResponse.setSuccess(false);
			propertyResponse.setProperty(null);
			return new ResponseEntity<>(propertyResponse, HttpStatus.BAD_REQUEST);
		}

		if (getAgent.getRole().equals("ROLE_AGENT")) {

			List<Property> getAllProperty = propertyService.getPropertyByAgenName(getAgent.getFullName());

			if (getAllProperty.isEmpty()) {
				propertyResponse.setMessage("Agent with ID " + agentId + " has no properties");
				propertyResponse.setSuccess(false);
				propertyResponse.setProperty(null);
				return new ResponseEntity<>(propertyResponse, HttpStatus.BAD_REQUEST);
			} else {
				propertyResponse.setMessage("Displaying the Properties for  the agent: " + getAgent.getFullName());
				propertyResponse.setSuccess(true);
				propertyResponse.setProperty(getAllProperty);
				return new ResponseEntity<>(propertyResponse, HttpStatus.OK);
			}

		} else {
			propertyResponse.setMessage("The Role didnt match our ROLE_AGENT");
			propertyResponse.setSuccess(false);
			propertyResponse.setProperty(null);
			return new ResponseEntity<>(propertyResponse, HttpStatus.BAD_REQUEST);
		}

	}

	@PostMapping("/viewProp/{regId}")
	public ResponseEntity<BasicResponse> getPropertyByRegId(@PathVariable("regId") String regId,
			@RequestHeader("Authorization") String jwt) {

		BasicResponse response = new BasicResponse();

		Property property = propertyService.getPropertyByRegId(regId);

		if (property == null) {
			response.setMessage("There is no property with Reg Id: " + regId);
			response.setProperty(null);
			return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		} else {
			response.setMessage("There is a property with Reg Id: " + regId);
			response.setProperty(property);
			return new ResponseEntity<>(response, HttpStatus.OK);
		}
	}

	@GetMapping("/deleteProperty/{agentId}/{propId}")
	public ResponseEntity<MessageResponse> deletePropertyById(@PathVariable("propId") int propertyId,
			@PathVariable("agentId") int agentId) {

		MessageResponse response = new MessageResponse();

		UserAgent userAgent = useragentRepo.findById(agentId).get();

		String agentFullName = userAgent.getFullName();

		List<Property> allProperty = propertyService.getPropertyByAgenName(agentFullName);

		if (allProperty.isEmpty()) {
			response.setMessage("No Property was not found  with Agent Id: " + agentId);
			return new ResponseEntity<>(response, HttpStatus.OK);
		} else {
			Property property = propRepo.findById(propertyId).get();

			if (property != null) {
				propRepo.delete(property);
				response.setMessage("Property was deleted with Reg Id: " + property.getPropertyRegId());
				return new ResponseEntity<>(response, HttpStatus.OK);
			} else {
				response.setMessage("Property was not found  with  Id: " + propertyId);
				return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);

			}
		}

	}

	@PutMapping("/editProperty/{agentId}/{propertyId}")
	public ResponseEntity<PropertyResponse> editPropertyHandler(@RequestHeader("Authorization") String jwt,
			@PathVariable("agentId") int agentId, @PathVariable("propertyId") int propertyId,
			@RequestBody Property property) throws UserAgentException {

		PropertyResponse propertyResponse = new PropertyResponse();

		Optional<UserAgent> optionalUserAgent = useragentRepo.findById(agentId);

		UserAgent getAgent = null;

		if (optionalUserAgent.isPresent()) {
			getAgent = optionalUserAgent.get();
		} else {
			propertyResponse.setMessage("Agent with ID " + agentId + " not found");
			propertyResponse.setSuccess(false);
			return new ResponseEntity<>(propertyResponse, HttpStatus.BAD_REQUEST);
		}

		if (getAgent.getRole().equals("ROLE_AGENT")) {

			String agentFullName = getAgent.getFullName();

			property.setUserAgentName(agentFullName);

			List<Property> getAllProperty = propertyService.getPropertyByAgenName(getAgent.getFullName());

			if (getAllProperty.isEmpty()) {
				propertyResponse.setMessage("Agent with ID " + agentId + " has no properties");
				propertyResponse.setSuccess(false);
				propertyResponse.setProperty(null);
				return new ResponseEntity<>(propertyResponse, HttpStatus.BAD_REQUEST);
			} else {
				Property addProperty = propertyService.editProperty(property, propertyId);

				if (addProperty == null) {
					propertyResponse.setMessage("Property didnt edited successfully");
					propertyResponse.setSuccess(false);
					propertyResponse.setProp(null);
					return new ResponseEntity<>(propertyResponse, HttpStatus.BAD_REQUEST);
				} else {
					propertyResponse.setMessage("Property edited successfully to the Agent of " + agentFullName);
					propertyResponse.setSuccess(true);
					propertyResponse.setProp(addProperty);
					return new ResponseEntity<>(propertyResponse, HttpStatus.CREATED);
				}
			}
		} else {
			propertyResponse.setMessage("The Role didnt match our ROLE_AGENT");
			propertyResponse.setSuccess(false);
			propertyResponse.setProp(null);
			return new ResponseEntity<>(propertyResponse, HttpStatus.BAD_REQUEST);
		}

	}

	@PostMapping("/filter")
	public ResponseEntity<List<Property>> filterProperties(@RequestHeader("Authorization") String jwt,
			@RequestBody PropertyFilterDTO filterDTO) {
		System.out.println(filterDTO);
		List<Property> filteredProperties = propertyService.filterProperties(filterDTO);
		return ResponseEntity.ok(filteredProperties);
	}
}
