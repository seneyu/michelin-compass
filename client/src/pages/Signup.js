import React, { useState } from 'react';

const Signup = () => {
  const [data, setData] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const username = event.target.elements['username-signup'].value;
    const password = event.target.elements['password-signup'].value;

    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('User created: ', data);
      setData(data);
    } catch (error) {
      alert(`Error: ${error.response.data.message.err}`);
    }
    event.target.elements['username-signup'].value = '';
    event.target.elements['password-signup'].value = '';
  };

  return (
    <div className="pages">
      <h3>User Signup Page</h3>
      <br />
      <form onSubmit={handleSubmit}>
        <label htmlFor="username-signup">
          Username:
          <input name="username-signup" type="text" id="username-signup" />
        </label>
        <br />
        <br />
        <label htmlFor="password-signup">
          Password:
          <input name="password-signup" type="password" id="password-signup" />
        </label>
        <br />
        <br />
        <button className="submit-buttons" type="submit" value="Create User">
          Create User
        </button>
      </form>
      <div>
        <br />
        <h2>{data ? <p>Created User: {data.username}!</p> : <p></p>}</h2>
      </div>
    </div>
  );
};

export default Signup;
