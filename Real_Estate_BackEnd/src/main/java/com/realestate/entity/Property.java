package com.realestate.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Property {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int propertyId;

	private String propertyRegId;

	private String propertyName;

	// 1.Used for Filter
	// 1-Line Description with Location
	private String propertyCategory;

	// 3-Line Description
	private String propertyDescription;

	// 2.Used for Filter
	private String propertyPrice;

	// 3.Used for Filter
	private String propertySqFt;

	// 4.Used for Filter
	private String propertyStatus;

	// 1-Line Description with Category
	private String propertyCapital;

	// 5.Used for Filter
	// 1-Line Description with Category+Location+City
	private String propertyCity;

	private String propertyImageUrl;

	private String userAgentName;

	public Property() {

	}

	public Property(int propertyId, String propertyRegId, String propertyName, String propertyCategory,
			String propertyDescription, String propertyPrice, String propertySqFt, String propertyStatus,
			String propertyCapital, String propertyCity, String propertyImageUrl, String userAgentName) {
		super();
		this.propertyId = propertyId;
		this.propertyRegId = propertyRegId;
		this.propertyName = propertyName;
		this.propertyCategory = propertyCategory;
		this.propertyDescription = propertyDescription;
		this.propertyPrice = propertyPrice;
		this.propertySqFt = propertySqFt;
		this.propertyStatus = propertyStatus;
		this.propertyCapital = propertyCapital;
		this.propertyCity = propertyCity;
		this.propertyImageUrl = propertyImageUrl;
		this.userAgentName = userAgentName;
	}

	@Override
	public String toString() {
		return "Property [propertyId=" + propertyId + ", propertyRegId=" + propertyRegId + ", propertyName="
				+ propertyName + ", propertyCategory=" + propertyCategory + ", propertyDescription="
				+ propertyDescription + ", propertyPrice=" + propertyPrice + ", propertySqFt=" + propertySqFt
				+ ", propertyStatus=" + propertyStatus + ", propertyCapital=" + propertyCapital + ", propertyCity="
				+ propertyCity + ", propertyImageUrl=" + propertyImageUrl + ", userAgentName=" + userAgentName + "]";
	}

	public String getPropertyRegId() {
		return propertyRegId;
	}

	public void setPropertyRegId(String propertyRegId) {
		this.propertyRegId = propertyRegId;
	}

	public int getPropertyId() {
		return propertyId;
	}

	public void setPropertyId(int propertyId) {
		this.propertyId = propertyId;
	}

	public String getPropertyName() {
		return propertyName;
	}

	public void setPropertyName(String propertyName) {
		this.propertyName = propertyName;
	}

	public String getPropertyCategory() {
		return propertyCategory;
	}

	public void setPropertyCategory(String propertyCategory) {
		this.propertyCategory = propertyCategory;
	}

	public String getPropertyDescription() {
		return propertyDescription;
	}

	public void setPropertyDescription(String propertyDescription) {
		this.propertyDescription = propertyDescription;
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

	public String getPropertyStatus() {
		return propertyStatus;
	}

	public void setPropertyStatus(String propertyStatus) {
		this.propertyStatus = propertyStatus;
	}

	public String getPropertyCapital() {
		return propertyCapital;
	}

	public void setPropertyCapital(String propertyCapital) {
		this.propertyCapital = propertyCapital;
	}

	public String getPropertyCity() {
		return propertyCity;
	}

	public void setPropertyCity(String propertyCity) {
		this.propertyCity = propertyCity;
	}

	public String getPropertyImageUrl() {
		return propertyImageUrl;
	}

	public void setPropertyImageUrl(String propertyImageUrl) {
		this.propertyImageUrl = propertyImageUrl;
	}

	public String getUserAgentName() {
		return userAgentName;
	}

	public void setUserAgentName(String userAgentName) {
		this.userAgentName = userAgentName;
	}

}
