// import React from 'react'

// export default function Header() {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-primary">
//     <div className="container-md">
//        <a className="navbar-brand" href="#">Contacts App</a>
//     </div>
//     </nav>
    
//   )
// }
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { logout, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!token) return null;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/dashboard">
        Contact Manager
      </Link>

      <div className="ms-auto">
        <Link className="btn btn-outline-light me-2" to="/profile">
          Profile
        </Link>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
