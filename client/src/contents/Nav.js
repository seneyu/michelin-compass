import React from 'react';

const Nav = () => {
  return (
    <div className="nav-bar">
      <div>
        <img
          src="https://cdn1.iconfinder.com/data/icons/landmark-79/64/mont_saint_michel-island-landmark-france-town-normandy-travel-128.png"
          id="logo"
        />{' '}
        <span id="logo-title">Journey To The Stars</span>
      </div>
      <div className="search-bar">
        <input></input>
        <img
          src="https://cdn0.iconfinder.com/data/icons/Natsu_PNG/128/Natsu-Search.png"
          id="search-button"
        />
        {/* <button>Search</button> */}
      </div>
      <div className="auth">
        <button id="login-button">Login</button>
        <button id="signup-button">Sign Up</button>
      </div>
    </div>
  );
};

export default Nav;
