import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button } from 'react-bootstrap';
import Service from '../Service/Service';
import Navbar from './Navbar';
import Swal from 'sweetalert2'

const PropertyRegistrationForm = () => {
  const userData = JSON.parse(sessionStorage.getItem('USERDATA'));
  const user = userData.userAgent;

  const [formData, setFormData] = useState({
    propertyRegId: '',
    propertyName: '',
    propertyCategory: '',
    propertyPrice: '',
    propertySqFt: '',
    propertyStatus: '',
    propertyCapital: '',
    propertyCity: '',
    propertyImageUrl: '',
    propertyDescription: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    // console.log(user.userAgentId);
    // console.log(userData.jwt);

    try {
      Service.RegisterProperty(user.userAgentId,formData,userData.jwt);
      Swal.fire({
        title: "Successfully Added Property",
        icon: "success"
    });
    } catch (error) {
      Swal.fire({
        title: "Something went wrong",
        icon: "error"
    });
    }
    
    
    setFormData({
      propertyRegId: '',
      propertyName: '',
      propertyCategory: '',
      propertyPrice: '',
      propertySqFt: '',
      propertyStatus: '',
      propertyCapital: '',
      propertyCity: '',
      propertyImageUrl: '',
      propertyDescription: '',
    });
  };

  return <>
    <Navbar/>
    <div className='form'>
      <Container>
        <h2 className="text-center">Property Registration Form</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="propertyRegId">
            <Form.Label>Property Registration ID</Form.Label>
            <Form.Control
              type="text"
              name="propertyRegId"
              value={formData.propertyRegId}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="propertyName">
            <Form.Label>Property Name</Form.Label>
            <Form.Control
              type="text"
              name="propertyName"
              value={formData.propertyName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="propertyCategory">
            <Form.Label>Property Category</Form.Label>
            <Form.Control
              type="text"
              name="propertyCategory"
              value={formData.propertyCategory}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="propertyPrice">
            <Form.Label>Property Price</Form.Label>
            <Form.Control
              type="text"
              name="propertyPrice"
              value={formData.propertyPrice}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="propertySqFt">
            <Form.Label>Property SqFt</Form.Label>
            <Form.Control
              type="text"
              name="propertySqFt"
              value={formData.propertySqFt}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="propertyStatus">
            <Form.Label>Property Status</Form.Label>
            <Form.Control
              type="text"
              name="propertyStatus"
              value={formData.propertyStatus}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="propertyCapital">
            <Form.Label>Property Capital</Form.Label>
            <Form.Control
              type="text"
              name="propertyCapital"
              value={formData.propertyCapital}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="propertyCity">
            <Form.Label>Property City</Form.Label>
            <Form.Control
              type="text"
              name="propertyCity"
              value={formData.propertyCity}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="userAgentName">
            <Form.Label>Property Image URL</Form.Label>
            <Form.Control
              type="text"
              name="propertyImageUrl"
              value={formData.propertyImageUrl}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="userAgentName">
            <Form.Label>Property Description</Form.Label>
            <Form.Control
              type="text"
              name="propertyDescription"
              value={formData.propertyDescription}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
    </>
};

export default PropertyRegistrationForm;
