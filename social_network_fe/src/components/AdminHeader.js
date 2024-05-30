import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './header.css'; 

export default function UserHeader() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
  
    useEffect(() => {
      setUsername(localStorage.getItem("username"));
    }, []);
  
    const logout = (e) => {
      e.preventDefault();
      localStorage.removeItem("username");
      navigate("/");
    };
  
    return (
      <Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">
            Social Network
          </a>
          
  
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  Welcome Admin
                </a>
              </li>
              <li className="nav-item">
                <Link to="/registrationlist" className="nav-link">
                  Registration Management
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/articlelist" className="nav-link">
                   Article Management
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/newslist" className="nav-link">
                  News Management
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/stafflist" className="nav-link">
                  Staff Management
                </Link>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
                onClick={(e) => logout(e)}
              >
                Logout
              </button>
            </form>
          </div>
        </nav>
      </Fragment>
    );
  }