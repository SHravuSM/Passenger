import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function SignIn() {
  const { SignInWithGoogle, mobile, setMobile } = useAuth();

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 px-4">
      
    </div>
  );
}