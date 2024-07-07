import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div className="nav-bar">
      <div>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <img
            src="https://cdn1.iconfinder.com/data/icons/landmark-79/64/mont_saint_michel-island-landmark-france-town-normandy-travel-128.png"
            id="logo"
          />{' '}
          <span id="logo-title">Journey To The Stars</span>
        </Link>
      </div>
      {/* <div className="search-bar">
        <input></input>
        <img
          src="https://cdn0.iconfinder.com/data/icons/Natsu_PNG/128/Natsu-Search.png"
          id="search-button"
        />
      </div> */}
      <div className="auth">
        <Link to="/entries">
          <button className="other-buttons">Reviews</button>
        </Link>
        <Link to="/writereview">
          <button className="other-buttons">Write Review</button>
        </Link>
        <Link to="/login">
          <button className="other-buttons">Login</button>
        </Link>
        <Link to="/signup">
          <button id="signup-button">Signup</button>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
