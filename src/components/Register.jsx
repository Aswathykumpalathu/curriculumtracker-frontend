import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';
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
        console.log('response')
        console.log(response.data.message)
        if (response.data.message === "Registered Succesfully") {
          alert(response.data.message);
          navigate('/');
        }
        else {
            alert('Please try once again');   
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="register ">
    <div className="cont container ">
      <div className="row">
        <div className="col-lg-12  ">
          <div className="card2 card   bg-rgba(255, 255, 255, 0.15)">
            <div className="regist card-header">Register</div>
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
              <button className="btn2 btn btn-success mt-3" onClick={submitHandler}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Register;
