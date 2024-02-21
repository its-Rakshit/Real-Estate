import axios from "axios";

const signup_user = "http://localhost:8080/auth/saveUser";
const signup_agent = "http://localhost:8080/auth/saveAgent";
const signin = "http://localhost:8080/auth/signin";
const allProperty = "http://localhost:8080/api/user/viewProperty/";
const registerProperty = "http://localhost:8080/api/agent/addProperty/";
const filterURL = "http://localhost:8080/api/agent/filter";
const agentAssign = ""
const watchList = ""

class Service {
  login(LoginRequest) {
    return axios.post(signin, LoginRequest);
  }

  registerUser(userEntity) {
    return axios.post(signup_user, userEntity);
  }

  registerAgent(userEntity) {
    return axios.post(signup_agent, userEntity);
  }

  search(searchData) {
    return axios.post(searchData); //need URL
  }

  profile() {
    return axios.get("http://localhost:8080/api/agent/profile", {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzM4NCJ9.eyJpYXQiOjE3MDc5OTc3MTEsImV4cCI6MTcwODg0MzcxMSwiZW1haWwiOiJhQGdtYWlsLmNvbSJ9.ict_N5jfqEaewiK7NqFX6RZIYgellhRsn3_2C3RKhiVLkjZpbGsf_2Vs2UHQZgND",
      },
    });
  }

  viewAllProperty(location, jwt) {
    return axios.post(allProperty + location, {}, {
      headers: {
        Authorization: "Bearer " + jwt,
      }
    })
  }

  RegisterProperty(id, formData, jwt){
    console.log("Console Data")
    console.log("id = " + registerProperty + id)
    console.log(formData)
    console.log("Bearer " + jwt)

    return axios.post(registerProperty + id, formData,{
        headers: {
          Authorization: "Bearer " + jwt,
        },
      });
  }

  FilterProperty(filterData, jwt){
    return axios.post(filterURL, filterData, {
        headers: {
            Authorization: "Bearer " + jwt,
            "Content-Type": "application/json"
        },
    })
    // .then((res) => {
    //   console.log("Server Response Below")
    //     console.log(res.data);
    // })
  }

  AssignAgent(formData){
    return axios.post(agentAssign, formData)
  }

  WatchList(formData){
    return axios.post(watchList, formData)
  }
}



export default new Service();
