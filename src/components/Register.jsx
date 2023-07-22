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
    </div>
  );
};

export default Register;
