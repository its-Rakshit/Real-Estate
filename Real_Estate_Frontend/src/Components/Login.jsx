import {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import { IoIosEye } from "react-icons/io";
import { FaEyeLowVision } from "react-icons/fa6";
import { Link} from "react-router-dom";
import Service from "../Service/Service";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [logindata, setdata] = useState({ email: "", password: "" });

  const handleOnChange = (e) => {
    const { id, value } = e.target;
    setdata((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await Service.login(logindata);
      sessionStorage.setItem("USERDATA", JSON.stringify(response.data));
        if(response.data.success){
          console.log(response)
          navigate("/")
        }else{
          Swal.fire({
            title: "Invalid User",
            text: "Please check your ID and Password",
            icon: "error"
        });
        }
      console.log(JSON.parse(sessionStorage.getItem('USERDATA')));
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  
  
  return (
    <div className="login-background d-flex">
      <div className="login-container align-content-center">
        <h2 className="text-center">Login</h2>
        <form>
          <div className="mb-3 mt-3 ">
            <input
              type="text"
              placeholder="User ID"
              className="form-control"
              onChange={handleOnChange}
              id="email"
            />
          </div>
          <div className="mb-3 input-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="form-control"
              id="password"
              onChange={handleOnChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="btn bg-white border-0"
              id="eye"
            >
              {showPassword ? <FaEyeLowVision /> : <IoIosEye />}
            </button>
          </div>
          <div className="d-flex justify-content-between align-items-center"></div>
          <button
            type="button"
            className="btn btn-dark w-100 mt-2 p-2 fs-5"
            onClick={handleSubmit}
          >
            Login
          </button>
        </form>
        <p className="register mt-3 text-center fs-5">Don't have an account? <Link to="/user-registration">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;
