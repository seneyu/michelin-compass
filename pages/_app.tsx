import React, { useState } from 'react';
import type { AppProps } from 'next/app';
import Nav from '../components/Nav';
import '../styles/global.css';

const App = ({ Component, pageProps }: AppProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('An error occurred when logging out user: ', error);
    }
  };

  return (
    <div className="main">
      <Nav isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Component {...pageProps} onLogin={handleLogin} />
    </div>
  );
};

export default App;
