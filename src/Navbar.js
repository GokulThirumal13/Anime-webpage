import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Animeselection.css'

function Navbar() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Anime Finder</Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <button className="auth-btn" onClick={() => setShowLogin(!showLogin)}>
            {showLogin ? "Sign Up" : "Login"}
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;