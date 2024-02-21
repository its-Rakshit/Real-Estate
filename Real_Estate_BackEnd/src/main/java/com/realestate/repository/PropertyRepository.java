package com.realestate.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.realestate.entity.Property;

public interface PropertyRepository extends JpaRepository<Property, Integer> {

	public boolean existsByPropertyRegId(String propertyRegId);

	public List<Property> findByPropertyCapital(String propertyLocation);

	public List<Property> findByUserAgentName(String fullName);

	public Property findByPropertyRegId(String regId);

	/*
	 * @Query("SELECT p FROM Property p WHERE " +
	 * "(:propertyPrice IS NULL OR p.propertyPrice IN :propertyPrice) AND " +
	 * "(:propertySqft IS NULL OR p.propertySqft IN :propertySqft) AND " +
	 * "(:propertyStatus IS NULL OR p.propertyStatus IN :propertyStatus) AND " +
	 * "(:propertyCategory IS NULL OR p.propertyCategory IN :propertyCategory) AND "
	 * + "(:propertyCity IS NULL OR p.propertyCity IN :propertyCity)") public
	 * List<Property> findByFilterOptions(String propertyPrice, String propertySqft,
	 * List<String> propertyStatus, List<String> propertyCategory, List<String>
	 * propertyCity);
	 */

	List<Property> findByPropertyPriceAndPropertySqFtAndPropertyStatusInAndPropertyCategoryInAndPropertyCityIn(String propertyPrice,
			String propertySqFt, List<String> propertyStatus, List<String> propertyCategory, List<String> propertyCity);

}
