'use client';
import Signup from '@/components/Signup';

const SignupPage = () => {
  return <Signup onSignup={() => console.log('User signed up')} />;
};

export default SignupPage;
