import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./SearchResult.css";
import Service from "../Service/Service";

export const SearchResult = () => {
  const [userData, setuserData] = useState();
  const [data, setData] = useState([]);

  useEffect(() => {
    const storedData = sessionStorage.getItem("searchData");
    try {
      if (storedData) {
        setData(JSON.parse(storedData));
      }
    } catch (error) {
      console.error("Error parsing session storage data: ", error);
    }
  }, []);

  const handleremoveFilter = () =>{
    const storedData = sessionStorage.getItem("searchData");
    setData(JSON.parse(storedData));
  }

  useEffect(() => {
    setuserData(JSON.parse(sessionStorage.getItem("USERDATA")));
  }, []);
//  useEffect(()=>{
//     console.log(userData.userAgent.role)
//   },[userData])
 

  // useEffect(() => {
  //   console.log("Below is the Data");
  //   console.log(data);
  // }, [data]);

  const [filterprice, setfilterprice] = useState(0);
  const [filterarea, setfilterarea] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filterSubLocations, setfilterSubLocations] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [subLocationsList, setsubLocationsList] = useState([]);

  const handleChange = (event) => {
    setfilterprice(event.target.value);
  };

  const handleChangearea = (event) => {
    setfilterarea(event.target.value);
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedCategories((prev) => [...prev, value]);
    } else {
      setSelectedCategories((prev) => prev.filter((item) => item !== value));
    }
  };

  const handleButtons = (p_id, key) =>{
    let formdata = {
      propertyId : p_id,
      userAgentId : userData.userAgent.userAgentId
    }
    if(key === "watch"){
      // Service.WatchList(formdata);
      console.log("Watch List")
      console.log(formdata);
    }else{
      // Service.AssignAgent(formdata);
      console.log("Assign agent")
      console.log(formdata);
    }
  } 

  const handleApplyFilter = () => {
    let filterData = {
      //propertyPrice: filterprice.toString(),
      //propertySqFt: filterarea.toString(),
      propertyStatus: selectedStatus,
      propertyCategory: selectedCategories,
      propertyCity: filterSubLocations,
    };
    // console.log(filterData);

    Service.FilterProperty(filterData, userData.jwt).then((res)=>{
      // console.log("From Result Page")
      // console.log(res.data)
      const len = res.data;
      if(len.length >=1 ){
        setData(res.data);
      }else{
        alert("No Data Found According to Your Filter")
      }
      
    })
  };

  const handleCheckboxChangestatus = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedStatus((prev) => [...prev, value]);
    } else {
      setSelectedStatus((prev) => prev.filter((item) => item !== value));
    }
  };

  const handleCheckboxChangesubloaction = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setfilterSubLocations((prev) => [...prev, value]);
    } else {
      setfilterSubLocations((prev) => prev.filter((item) => item !== value));
    }
  };

  const subLocations = (string) => {
    const stringList = subLocationsList.map(String);
    if (stringList.includes(string)) {
    } else {
      setsubLocationsList((prevData) => {
        if (!prevData.includes(string)) {
          return [...prevData, string];
        }
        return prevData;
      });
    }
  };

  // useEffect(() => {
  //   console.log(subLocationsList);
  // }, [subLocationsList]);

  return (
    <>
      <Navbar />

      <div className="container-fluid d-flex mt-5 ">
        <div className="filter d-flex flex-column">
          <div className="text-center">
            <h1>Fillter</h1>
          </div>

          <div className="price-fillter">
            <h3>Budget</h3>
            <div>
              <input
                className="mt-2 w-75 "
                type="range"
                id="slider"
                name="slider"
                min="01"
                max="100"
                value={filterprice}
                onChange={handleChange}
              />
            </div>
            <label htmlFor="slider">{filterprice}</label> Lakhs
          </div>

          <div className="category-fillter">
            <h3>Categories</h3>
            <div className="checkbox text-start">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="Villa"
                  id="villaCheckbox"
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="villaCheckbox">
                  Villa
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="1BHK"
                  id="oneBHKCheckbox"
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="oneBHKCheckbox">
                  1BHK
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="2BHK"
                  id="twoBHKCheckbox"
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="twoBHKCheckbox">
                  2BHK
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="3BHK"
                  id="threeBHKCheckbox"
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="threeBHKCheckbox">
                  3BHK
                </label>
              </div>
            </div>
            <p>Selected Categories: {selectedCategories.join(", ")}</p>
          </div>

          <div className="price-fillter">
            <h3>Area</h3>
            <p>Sq.ft</p>
            <div>
              <input
                className="mt-2 w-75 "
                type="range"
                id="slider"
                name="slider"
                min="01"
                max="4000"
                value={filterarea}
                onChange={handleChangearea}
              />
            </div>
            <label htmlFor="slider">{filterarea}</label> Sq.ft
          </div>

          <div className="status-fillter mt-5 text-center">
            <h3>Construction Status</h3>
            <div className="checkbox text-start">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="Ready to Move"
                  id="Ready to Move"
                  onChange={handleCheckboxChangestatus}
                />
                <label className="form-check-label" htmlFor="Ready to Move">
                  Ready to Move
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="Under Construction"
                  id="Under Construction"
                  onChange={handleCheckboxChangestatus}
                />
                <label
                  className="form-check-label"
                  htmlFor="Under Construction"
                >
                  Under Construction
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="Yet to Construct"
                  id="Yet to Construct"
                  onChange={handleCheckboxChangestatus}
                />
                <label className="form-check-label" htmlFor="Yet to Construct">
                  Yet to Construct
                </label>
              </div>
            </div>
            <p>Selected Status: {selectedStatus.join(", ")}</p>
          </div>
          {/* Sub Locality */}
          <div className="sublocality-fillter text-center mt-5 ">
            <h3>Sub Locations</h3>
            <div className="checkbox text-start">
              {subLocationsList.map((ele) => (
                <div className="form-check" key={ele}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={ele}
                    id={ele}
                    onChange={handleCheckboxChangesubloaction}
                  />
                  <label className="form-check-label" htmlFor={ele}>
                    {ele}
                  </label>
                </div>
              ))}
            </div>
            <p>Selected Locality: {filterSubLocations.join(", ")}</p>
          </div>
          <button onClick={handleApplyFilter} className="text-center ">
            Apply
          </button>
          <button onClick={handleremoveFilter} className="text-center ">
            Remove All Filter
          </button>
        </div>

        <div className="search-cards">
          {data.map((ele) => (
            <div className="card-container">
              <div className="row" key={ele.propertyId}>
                <div className="col-5" id="image-container">
                  <img
                    className="image-container_img"
                    src={ele.propertyImageUrl}
                    alt="Image"
                  />
                </div>
                {subLocations(ele.propertyCity)}
                <div className="col-6">
                  <div className="heading">
                    <h3>{ele.propertyName}</h3>
                    <p>
                      {ele.propertyCategory} / Property in {ele.propertyCity},{" "}
                      {ele.propertyCapital}
                    </p>
                  </div>
                  <div className="d-flex" id="details-01">
                    <div className="price">
                      <h4>₹ {ele.propertyPrice}L</h4>
                      <p>₹ {Math.floor((ele.propertyPrice * 100000)/ele.propertySqFt)} / sqft</p>
                    </div>
                    <div className="size">
                      <h4>{ele.propertySqFt} sqft ({Math.floor (ele.propertySqFt/10.764)} sqm)</h4>
                      <p>{ele.propertyCategory} Area</p>
                    </div>
                    <div className="type">
                      <h4>{ele.propertyCategory}</h4>
                      <p>{ele.propertyStatus}</p>
                    </div>
                  </div>
                  <div className="discription">
                    <p>{ele.propertyDescription}</p>
                  </div>
                  <div className="d-flex" id="details-02">
                    <div className="d-flex" id="details-03">
                      <p className="p-0 m-0">Uploaded By:-</p>
                      <h4>{ele.userAgentName}</h4>
                    </div>
                    { userData.userAgent.role === "ROLE_USER" &&
                    <div>
                    <div>
                      <button type="button" class="btn btn-info" onClick={()=>{handleButtons(ele.propertyId, "watch")}}>
                        Add to watch List
                      </button>
                    </div>
                    
                    <div>
                      <button type="button" class="btn btn-success" onClick={()=>{handleButtons(ele.propertyId, "agent")}}>
                        Assign an Agent
                      </button>
                    </div>
                    </div>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
