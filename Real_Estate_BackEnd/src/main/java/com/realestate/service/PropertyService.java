package com.realestate.service;

import java.util.List;

import com.realestate.dto.PropertyFilterDTO;
import com.realestate.entity.Property;


public interface PropertyService {
	
	public Property saveProperty(Property property);
	
	public Property getPropertyByRegId(String regId);
	
	public List<Property> getPropertyByAgenName(String agentfullName);
	
	public boolean getPropertyByPropertyRegId(String propertyRegId);
	
	public boolean deletePropertyById(int id);
	
	public List<Property> gettAllProperties();
	
	public List<Property> getAllPropertiesByLocation(String location);
	
	public boolean validateRegId(String regId);
	
	public Property editProperty(Property property , int id);
	
	 public List<Property> filterProperties(PropertyFilterDTO filterDTO);
}
