<<<<<<< HEAD
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = () => {
    const dataToSend = {
      ...inputs,
      role: 'user', // Replace 'user' with the desired userrole value
    };

    axios.post("http://localhost:5000/api/user", dataToSend)
      .then((response) => {
        if (response.data.message === "Registered Successfully") {
          alert(response.data.message);
          navigate('/');
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="container mb-5 mt-4">
      <div className="row">
        <div className="col-lg-12">
          <div className="card border-secondary">
            <div className="card-header">Register</div>
            <div className="card-body p-5 bg-gradient-blue-card-1">
              <div className="row g-3">
                <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                  <label htmlFor="username">UserName</label>
                  <input type="text" className="form-control" name="username" onChange={inputHandler} />
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                  <label htmlFor="email">Email Id</label>
                  <input type="text" className="form-control" name="email" onChange={inputHandler} />
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <label htmlFor="address">Address</label>
                  <input type="text" className="form-control" name="address" onChange={inputHandler} />
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                  <label htmlFor="phone">Phone</label>
                  <input type="text" className="form-control" name="phone" onChange={inputHandler} />
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control" name="password" onChange={inputHandler} />
                </div>
              </div>
              <button className="btn btn-success mt-3" onClick={submitHandler}>Submit</button>
            </div>
          </div>
        </div>
      </div>
=======
import React, { useState } from "react";
import axios from "axios";



const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    address: "",
    email: "",
    phone: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/user`, formData);
      alert("Registered Successfully!");
      setFormData({
        username: "",
        address: "",
        email: "",
        phone: "",
        password: "",
        role: "",
      });
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">
            Role
          </label>
          <input
            type="text"
            className="form-control"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
>>>>>>> 590deecd4fd8376ee9423a7a8d33583f383e33e2
    </div>
  );
};

<<<<<<< HEAD
export default Register;
=======
export default Register;
>>>>>>> 590deecd4fd8376ee9423a7a8d33583f383e33e2
