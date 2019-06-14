import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <h1>Welcome to Smurfville</h1>
      <NavLink to="/" className="nav-link">
        Home
      </NavLink>
      <NavLink to="/smurfs" className="nav-link">
        See Smurfs
      </NavLink>
      <NavLink to="/add" className="nav-link">
        Edit Smurf
      </NavLink>
    </div>
  );
};

export default NavBar;
