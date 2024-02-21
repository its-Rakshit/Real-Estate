import { useState, useEffect } from 'react';
import "./Navbar.css"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    try {
      const data = JSON.parse(sessionStorage.getItem('USERDATA')).userAgent;
      setUserData(data);
    } catch (error) {
      setUserData(null);
    }
  }, []);

  // useEffect(()=>{
  //   if(userData){
  //     console.log("Navbar")
  //     console.log(userData.role)
  //   }
  // },[userData])

  const handleLogout = () => {
    sessionStorage.clear();
    setUserData(null);
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const renderDropdownItem = (role, text) => {
    return userData && userData.role === role && (
      <a className="dropdown-item" href="#">
        {text}
      </a>
    );
  };

  return (
    <nav className="navbar navbar-expand naav" aria-label="Second navbar example">
      <div className="container-fluid">
        <a className="navbar-brand" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="black" className="bi bi-buildings-fill" viewBox="0 0 16 16">
  <path d="M15 .5a.5.5 0 0 0-.724-.447l-8 4A.5.5 0 0 0 6 4.5v3.14L.342 9.526A.5.5 0 0 0 0 10v5.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V14h1v1.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5zM2 11h1v1H2zm2 0h1v1H4zm-1 2v1H2v-1zm1 0h1v1H4zm9-10v1h-1V3zM8 5h1v1H8zm1 2v1H8V7zM8 9h1v1H8zm2 0h1v1h-1zm-1 2v1H8v-1zm1 0h1v1h-1zm3-2v1h-1V9zm-1 2h1v1h-1zm-2-4h1v1h-1zm3 0v1h-1V7zm-2-2v1h-1V5zm1 0h1v1h-1z"/>
</svg></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample02" aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample02">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link active" href="#home"><button type="button" className="btn btn-outline-dark ms-3 fs-5 fw-bold">Home</button></a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#"><button type="button" className="btn btn-outline-dark ms-3 fs-5 fw-bold">Properties</button></a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#aboutus"><button type="button" className="btn btn-outline-dark ms-3 fs-5 fw-bold">About us</button></a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#contactus"><button type="button" className="btn btn-outline-dark ms-3 fs-5 fw-bold">Contact us</button></a>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle fs-5 fw-bold mt-2"
                href="#"
                id="navbarDropdown"
                role="button"
                onClick={toggleDropdown}
                aria-haspopup="true"
                aria-expanded={isOpen ? 'true' : 'false'}
              >
                {userData ? userData.fullName : <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-bounding-box" viewBox="0 0 16 16">
  <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5M.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5"/>
  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
</svg>}
              </a>
              <div className={`dropdown-menu ${isOpen ? 'show' : ''}`} aria-labelledby="navbarDropdown">
                {renderDropdownItem("ROLE_USER", "User Dashboard")}
                {renderDropdownItem("ROLE_AGENT", "Agent Dashboard")}
                <div className="dropdown-divider"></div>
                {userData && userData.role === "ROLE_AGENT" && <a className="dropdown-item" href={"/PropertyRegistrationForm"}>
                  Add Property
                </a>}
                <a className="dropdown-item" href="/login" onClick={handleLogout}>
                  {userData ? "Logout" : "Sign In"}
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
