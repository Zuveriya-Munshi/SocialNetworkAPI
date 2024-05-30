import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; 

import './Registration.css'; 

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const url = "https://localhost:7020/api/Registration/Login";
    const data = {
      Email: email,
      Password: password,
      Name: '', 
      PhoneNo: '' ,
      UserType: ''

    };

    axios.post(url, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((result) => {
      const dt = result.data;
      if (dt.statusCode === 200) {
        if (email === "admin" && password === "admin") {
          localStorage.setItem("username", email);
          navigate("/admindashboard");
        } else {
          localStorage.setItem("loggedEmail", email);
          localStorage.setItem("username", dt.registration.name);
          if (dt.registration.userType === "STAFF") {
            navigate("/staffdashboard");
          } else {
            navigate("/userdashboard");
          }
        }
      }
      else{
        alert(dt.statusMessage);

      }
    })
    .catch((error) => {
      console.log(error);
    });
  };
  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-9 col-xl-7">
            <div className="card shadow-2-strong card-registration">
              <div className="card-body p-4 p-md-5">
                <form>
                  <div className="divider d-flex align-items-center mb-4">
                    <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Login Form</h3>
                  </div>
                  <div className="form-group">
                  <label htmlFor="Email"> Email Id</label>
                    <input type="email" id="Email" className="form-control form-control-lg" placeholder="Enter email address" onChange={(e) => setEmail(e.target.value)} value={email} />
                  </div>
                  <div className="form-group">
                  <label htmlFor="Password">Password</label>
                    <input type="password" id="Password" className="form-control form-control-lg" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} value={password}/>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="d-grid gap-2">
                    <button type="button" className="btn btn-primary btn-lg button"  onClick={(e) => handleLogin(e)}>Login</button>
                  </div>
                  
                  </div>
                 
                  <div className="mt-4 pt-2 link" style={{ marginTop: '20px' }}>Don't have an account?
                   <Link to="/Registration" className="btn btn-primary btn-lg ">Register</Link>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="text-center text-white py-4">
        <div className="container">
          <div className="mb-3">
            <a href="#!" className="me-4 text-reset">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#!" className="me-4 text-reset">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#!" className="me-4 text-reset">
              <i className="fab fa-google"></i>
            </a>
            <a href="#!" className="text-reset">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
          <p className="mb-0">Copyright © 2024. All rights reserved.</p>
        </div>
      </footer>
    </section>
  );
}

export default Login;
