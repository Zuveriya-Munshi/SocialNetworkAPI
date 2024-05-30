import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; 
import "./Registration.css"; 

function Registration() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNo, setPhoneNo] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    const url = "https://localhost:7020/api/Registration/Registration";
    const data = {
      Name: name,
      Email: email,
      Password: password,
      PhoneNo: phoneNo,
      UserType: 'USER'

    };

    axios.post(url, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((result) => {
        clear();
        const dt = result.data;
        alert(dt.statusMessage);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const clear = () => {
    setName('');
    setEmail('');
    setPassword('');
    setPhoneNo('');
  }

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-9 col-xl-7">
            <div className="card shadow-2-strong card-registration" style={{ borderRadius: "15px" }}>
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Registration Form</h3>
                <form>
                  <div className="row">
                    <div className="form-group">
                      <label htmlFor="Name"> Name</label>
                      <input type="text" id="Name" className="form-control form-control-lg" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} value={name} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="Email"> Email Id</label>
                      <input type="text" id="Email" className="form-control form-control-lg" placeholder="Enter email id" onChange={(e) => setEmail(e.target.value)} value={email} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="Password">Password</label>
                      <input type="password" id="Password" className="form-control form-control-lg" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="PhoneNo"> Phone Number </label>
                      <input type="text" id="PhoneNo" className="form-control form-control-lg" placeholder="Enter Phone number" onChange={(e) => setPhoneNo(e.target.value)} value={phoneNo} />
                    </div>
                  </div>
                  <div className="mt-4 pt-2" >
                  <input data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg button" type="reset" value="Reset" />
                  <input data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg ms-2 button" type="submit" value="Submit" onClick={(e) => handleSave(e)} />
  </div>

                  <div className="mt-4 pt-2 link" style={{ marginTop: '20px' }}>
  <Link to="/" className="btn btn-primary btn-lg">Login</Link>
    </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Registration;
