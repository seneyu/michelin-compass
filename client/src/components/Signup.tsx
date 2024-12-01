import React, { useState } from 'react';
import { User } from '../types/interface';

const Signup = () => {
  const [data, setData] = useState<User | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const username = (
      form.elements.namedItem('username-signup') as HTMLInputElement
    ).value;
    const password = (
      form.elements.namedItem('password-signup') as HTMLInputElement
    ).value;

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message?.err || 'An error occurred during signup.'
        );
      }

      console.log('User created: ', data);
      setData(data);
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      } else {
        alert('An unknown error occurred.');
      }
    }
    form.reset();
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
