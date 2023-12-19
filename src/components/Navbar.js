import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  let location=useLocation();
  useEffect(()=>{
console.log(location);

  },[location])
  const NavStyle = {
    background: "linear-gradient(to right,#fd7e14, #ffc107 )",
    fontFamily: "Montserrat, sans-serif",
  };
  return (
    <nav className="navbar navbar-expand-lg bg-dark" style={NavStyle}>
      <div className="container-fluid">
        <Link className="navbar-brand text-white" to="/">
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="/navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={` text-white nav-link ${location.pathname==='/'? 'active' : ''} `} to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/about">
                About
              </Link>
            </li>

            
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-light" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
