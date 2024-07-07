// use useAuth hook to handle user authentication

import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [data, setData] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    const username = event.target.elements['username-login'].value;
    const password = event.target.elements['password-login'].value;

    // console.log(username, password);

    try {
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password,
      });
      console.log('User Info: ', response);
      if (response) {
        setData(response.data);
      }
    } catch (error) {
      console.error('An error occurred when logging in a user: ', error);
      alert(`Error: ${error.response.data.message.err}`);
    }
    event.target.elements['username-login'].value = '';
    event.target.elements['password-login'].value = '';
  };

  return (
    <div className="pages">
      <h3>User Login Page</h3>
      <br />
      <form onSubmit={handleLogin}>
        <label htmlFor="username-login">
          Username:
          <input
            name="username-login"
            type="text"
            id="username-login"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label htmlFor="password-login">
          Password:
          <input
            name="password-login"
            type="password"
            id="password-login"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <br />
        <button className="submit-buttons" type="submit" value="Login User">
          Login User
        </button>
      </form>
      <div>
        <br></br>
        <h2>{data ? <p>Welcome Back, {data.username}!</p> : <p></p>}</h2>
      </div>
    </div>
  );
};

export default Login;
