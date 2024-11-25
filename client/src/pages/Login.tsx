import React, { useState } from 'react';
import { ApiResponse } from '../types/interface';

const Login = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.err || 'An error occurred during login.');
      }

      const data = await response.json();
      console.log('User Info: ', data);

      setData(data);
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      }
      console.error('An error occurred when logging in a user: ', error);
    }
    form.reset();
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
        <button className="submit-buttons" type="submit">
          Login User
        </button>
      </form>
      <div>
        <br></br>
        {data && data.user && <h2>Welcome Back, {data.user.username}!</h2>}
      </div>
    </div>
  );
};

export default Login;
