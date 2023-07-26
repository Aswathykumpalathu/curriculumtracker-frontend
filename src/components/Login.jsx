import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const inputHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const addHandler = () => {
    axios.post("http://localhost:5000/api/login", user).then((response) => {
      if (response.data.message === "Login Success") {
        const token = response.data.token;
        const user_id = response.data.data._id;
        const role = response.data.data.role;
        sessionStorage.setItem("userToken", token);
        sessionStorage.setItem("userId", user_id);
        sessionStorage.setItem("userrole", role);
        alert(response.data.message);
        if (role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/employee');
        }
      } else {
        alert('Login failed');
      }
    });
  };

  return (
    <div className="login container-fluid vh-100 d-flex justify-content-center align-items-center">
      <div className="cardl card p-5 bg-rgba(255, 255, 255, 0.15)">
        <div className="card-body text-center">
          <img
            src="/Curriculum Tracker-1 (1).png"
            alt="Logo"
            className="mb-4"
            style={{ width: '150px', height: '150px', borderRadius: '50%' }}
          />
          <h2 className="welcome mb-4">Welcome !</h2>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">email</label>
            <input type="text" className="box form-control" id="email" name="email" placeholder='youremail@gmail.com' onChange={inputHandler} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="box form-control" id="password" name="password" placeholder='********' onChange={inputHandler} />
          </div>
          <div className="mb-3">
            <button className="btn1 btn btn-success" onClick={addHandler}>Submit</button>
          </div>
          <a className="reg1 btn btn-link " href="/register">Register</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
