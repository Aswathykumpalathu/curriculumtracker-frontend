import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-primary">
      <div className="card p-4">
        <div className="card-body text-center">
          <img
            src="logo.png"
            alt="Logo"
            className="mb-4"
            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
          />
          <h2 className="mb-4">Welcome !</h2>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Name</label>
            <input type="text" className="form-control" id="username" name="username" onChange={inputHandler} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" onChange={inputHandler} />
          </div>
          <div className="mb-3">
            <button className="btn btn-success" onClick={addHandler}>Submit</button>
          </div>
          <a className="btn btn-link" href="/register">Register</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
