package com.realestate.dto;

import java.util.List;

public class PropertyFilterDTO {

	private String propertyPrice;
	private String propertySqFt;
	private List<String> propertyStatus; 
	private List<String> propertyCategory;
	private List<String> propertyCity;

	public PropertyFilterDTO() {
	}

	public String getPropertyPrice() {
		return propertyPrice;
	}

	public void setPropertyPrice(String propertyPrice) {
		this.propertyPrice = propertyPrice;
	}

	public String getPropertySqFt() {
		return propertySqFt;
	}

	public void setPropertySqFt(String propertySqFt) {
		this.propertySqFt = propertySqFt;
	}

	public List<String> getPropertyStatus() {
		return propertyStatus;
	}

	public void setPropertyStatus(List<String> propertyStatus) {
		this.propertyStatus = propertyStatus;
	}

	public List<String> getPropertyCategory() {
		return propertyCategory;
	}

	public void setPropertyCategory(List<String> propertyCategory) {
		this.propertyCategory = propertyCategory;
	}

	public List<String> getPropertyCity() {
		return propertyCity;
	}

	public void setPropertyCity(List<String> propertyCity) {
		this.propertyCity = propertyCity;
	}

	public PropertyFilterDTO(String propertyPrice, String propertySqFt, List<String> propertyStatus,
			List<String> propertyCategory, List<String> propertyCity) {
		super();
		this.propertyPrice = propertyPrice;
		this.propertySqFt = propertySqFt;
		this.propertyStatus = propertyStatus;
		this.propertyCategory = propertyCategory;
		this.propertyCity = propertyCity;
	}

	@Override
	public String toString() {
		return "PropertyFilterDTO [propertyPrice=" + propertyPrice + ", propertySqFt=" + propertySqFt
				+ ", propertyStatus=" + propertyStatus + ", propertyCategory=" + propertyCategory + ", propertyCity="
				+ propertyCity + "]";
	}

	
	
	
}
