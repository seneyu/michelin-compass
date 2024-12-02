'use client';
import Login from '@/components/Login';

const LoginPage = () => {
  return <Login onLogin={() => console.log('User logged in')} />;
};

export default LoginPage;
