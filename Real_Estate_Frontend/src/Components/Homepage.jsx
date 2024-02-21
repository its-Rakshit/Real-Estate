import { useState } from "react";
import Navbar from "./Navbar";
import "./Homepage.css";
import Footer from "./Footer";
import Service from "../Service/Service";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

const Homepage = () => {
  const [searchData, setsearchData] = useState({searchQuery:"", category:"All Residential"});
  const navigate = useNavigate();
  const handleOnChange = (e) =>{
    const{id, value} = e.target;
    setsearchData((prevData)=>({
      ...prevData,
      [id] : value,
    }))
  }

  const handleSearch = async () => {
    try {
      const userData = JSON.parse(sessionStorage.getItem('USERDATA')).jwt;
      const response = await Service.viewAllProperty(searchData.searchQuery, userData);
      sessionStorage.setItem("searchData", JSON.stringify(response.data.property));
      console.log(sessionStorage.getItem("searchData"));
      navigate("/search-result")
    } catch (error) {
      Swal.fire({
        title: "Please Login to see the Search Results",
        text: "Press ok to login",
        icon: "error"
      });
      navigate("/login")
    }
}


  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <div className="text-center" id="hero-container">
        
        <div className="col-lg-6 mx-auto"></div>
        <h3 className="text-center quote "><em>Bringing your real estate dreams to life Where finding your dream home is not just a goal, it's our passion</em></h3>
           {/* Search Bar */}
      <div className="container search" id="search-bar-container">
        <div className="row">
          <div className="col-2 p-0">
            <div className="input-group">
              <select className="form-select fw-bold text-center" id="category" onChange={handleOnChange}> 
                <option selected>All Residential</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Independent House">Independent House</option>
              </select>
            </div>
          </div>
          <div className="col-8 p-0">
            <input
              type="text"
              className="form-control"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
              id="searchQuery"
              onChange={handleOnChange}
            />
          </div>
          <div className="col-2 p-0">
            <div className="input-group-append">
              <button
                className="btn btn-dark px-5 py-2"
                type="button"
                id="button-addon2"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
     


   
      <div className="about" id="about">
          <div>
            <h2 className="text-center my-3">ABOUT US </h2>
            <h3 className="text-center my-3"><em>From listings to keys, we've got you covered</em></h3>
            <h4 className="description text-center mx-5 text-secondary">At our Real Estate Company, we believe that finding your dream home or making successful real estate investments should be an exciting and rewarding journey. With a passion for exceptional service and a commitment to integrity, we are dedicated to helping you navigate the complex world of real estate with confidence and ease.</h4>
          </div>
          <div>
            <h2 className="text-center my-3">Our Mission</h2>
            <h3 className="text-center my-3"><em>Unlock the door to your dream home</em></h3>
            <h4 className="description text-center mx-5 text-secondary">Our mission is simple: to empower our clients with the knowledge, tools, and support they need to achieve their real estate goals. Whether you're a first-time homebuyer, a seasoned investor, or looking to sell your property, we are here to provide personalized guidance and expert advice every step of the way.</h4>
          </div>
          <h2 className="text-center my-3">Why Choose Us?</h2>
          <CardGroup>
      <Card style={{borderRadius:"13px", margin:"5px",boxShadow: "10px 5px 5px gray"}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-person-fill-check mt-3"viewBox="0 0 16 16">
  <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
  <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
</svg>
        <Card.Body>
          <Card.Title align="center">Experience:</Card.Title>
          <Card.Text align="justify">
           With years of experience in the real estate industry, our team brings a wealth of knowledge and expertise to the table. We have successfully facilitated countless transactions and have a deep understanding of the local market dynamics.
          </Card.Text>
        </Card.Body>
      </Card>
      <Card style={{borderRadius:"13px", margin:"5px",boxShadow: "10px 5px 5px gray"}}>
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-question-octagon-fill mt-3" viewBox="0 0 16 16">
  <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353zM5.496 6.033a.237.237 0 0 1-.24-.247C5.35 4.091 6.737 3.5 8.005 3.5c1.396 0 2.672.73 2.672 2.24 0 1.08-.635 1.594-1.244 2.057-.737.559-1.01.768-1.01 1.486v.105a.25.25 0 0 1-.25.25h-.81a.25.25 0 0 1-.25-.246l-.004-.217c-.038-.927.495-1.498 1.168-1.987.59-.444.965-.736.965-1.371 0-.825-.628-1.168-1.314-1.168-.803 0-1.253.478-1.342 1.134-.018.137-.128.25-.266.25h-.825zm2.325 6.443c-.584 0-1.009-.394-1.009-.927 0-.552.425-.94 1.01-.94.609 0 1.028.388 1.028.94 0 .533-.42.927-1.029.927"/>
</svg>
        <Card.Body>
          <Card.Title align="center">Customer-Centric Approach:</Card.Title>
          <Card.Text align="justify">
           Your satisfaction is our top priority. We take the time to listen to your needs, understand your objectives, and tailor our services to meet your unique requirements. Our goal is to exceed your expectations and deliver results that exceed your expectations.
          </Card.Text>
        </Card.Body>
      </Card>
      <Card style={{borderRadius:"13px", margin:"5px",boxShadow: "10px 5px 5px gray"}}>
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-headset mt-3" viewBox="0 0 16 16">
  <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5"/>
</svg>
        <Card.Body>
          <Card.Title align="center">Transparency:</Card.Title>
          <Card.Text align="justify">
           We believe in open and honest communication. You can trust us to provide you with accurate information, unbiased advice, and full transparency throughout the buying, selling, or investing process. We are committed to keeping you informed and empowered every step of the way.
          </Card.Text>
        </Card.Body>
      </Card>
      
    </CardGroup>
    <CardGroup>
      <Card style={{borderRadius:"13px", margin:"5px",boxShadow: "10px 5px 5px gray"}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-person-fill-check mt-3"viewBox="0 0 16 16">
  <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
  <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
</svg>
        <Card.Body>
          <Card.Title align="center">Professionalism:</Card.Title>
          <Card.Text align="justify">
           From our dedicated agents to our reliable support staff, professionalism is at the core of everything we do. We adhere to the highest standards of ethics and professionalism, ensuring that your real estate experience is smooth, stress-free, and successful.
          </Card.Text>
        </Card.Body>
      </Card>
      <Card style={{borderRadius:"13px", margin:"10px",boxShadow: "10px 5px 5px gray"}}>
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-question-octagon-fill mt-3" viewBox="0 0 16 16">
  <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353zM5.496 6.033a.237.237 0 0 1-.24-.247C5.35 4.091 6.737 3.5 8.005 3.5c1.396 0 2.672.73 2.672 2.24 0 1.08-.635 1.594-1.244 2.057-.737.559-1.01.768-1.01 1.486v.105a.25.25 0 0 1-.25.25h-.81a.25.25 0 0 1-.25-.246l-.004-.217c-.038-.927.495-1.498 1.168-1.987.59-.444.965-.736.965-1.371 0-.825-.628-1.168-1.314-1.168-.803 0-1.253.478-1.342 1.134-.018.137-.128.25-.266.25h-.825zm2.325 6.443c-.584 0-1.009-.394-1.009-.927 0-.552.425-.94 1.01-.94.609 0 1.028.388 1.028.94 0 .533-.42.927-1.029.927"/>
</svg>
        <Card.Body>
          <Card.Title align="center">Local Expertise:</Card.Title>
          <Card.Text align="justify">
           As members of the community, we have a deep love for the area we serve. We have intimate knowledge of the neighborhoods, schools, amenities, and market trends, allowing us to provide you with invaluable insights and guidance.
          </Card.Text>
        </Card.Body>
      </Card>
      
    </CardGroup>
     </div>
     <div id="contact" className="m-5">
            <h2 className="text-center my-3">Get in Touch</h2>
            <h3 className="text-center my-3"><em>Find your perfect address, right here</em></h3>
            <h4 className="description text-center mx-5 text-secondary">Ready to embark on your real estate journey? Whether you're buying, selling, or investing, we're here to help. Contact us today to schedule a consultation and let's turn your real estate dreams into reality</h4>
          </div>
      {/* Footer */}
      <Footer/>
    </>
  );
};

export default Homepage;
