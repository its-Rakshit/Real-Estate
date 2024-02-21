import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Service from '../Service/Service';
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import "./RegistrationForm.css"

const RegistrationForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    async function handleSubmit(e){
        e.preventDefault();
        const response = (await Service.registerUser(formData)).data.success
        if(response === true){
            Swal.fire({
                title: "Registration Successful",
                icon: "success"
            });
            navigate("/login")

        }else{
            Swal.fire({
                title: "Registration Unsuccessful",
                text: "Something went wrong",
                icon: "error"
            });
        }
    }

    return (
        <form onSubmit={handleSubmit} className="container">
            <div className='image'></div>
            <div>
                <h1 className='text-center mb-5 mt-5'>User Registration</h1>
            </div>
            <div className='d-lg-flex justify-content-center text-center'>
            <div className="form-group m-2 fs-5">
                <label className='m-2'>Full Name</label>
                <input type="text" name="fullName" onChange={handleChange} className="form-control form-control-lg border-dark w-100" />
            </div>
            <div className="form-group m-2 fs-5">
                <label className='m-2'>Phone Number</label>
                <input type="tel" name="phoneNumber" onChange={handleChange} className="form-control form-control-lg border-dark w-100" />
            </div>
            <div className="form-group m-2 fs-5">
                <label className='m-2'>Email</label>
                <input type="email" name="email" onChange={handleChange} className="form-control form-control-lg border-dark w-100" />
            </div>
            <div className="form-group m-2 fs-5">
                <label className='m-2'>Password</label>
                <input type="password" name="password" onChange={handleChange} className="form-control form-control-lg border-dark w-100" />
            </div>
            </div>
            <button type="submit" className="btn btn-dark py-3 px-5 mt-3 submit">Submit</button>
        </form>
    );
};

export default RegistrationForm;
