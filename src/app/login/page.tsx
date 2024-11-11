'use client'; // This marks the component as a client component

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';  // Import the Next.js router

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();  // Use Next.js router for navigation

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your authentication logic here

    // After successful login, navigate to the author's dashboard
    router.push('/dashboard');  // Replace '/dashboard' with the actual route
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login to Your Account</h2>
        
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="text-sm">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-2 bg-gray-100 rounded-md focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="text-sm">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-2 bg-gray-100 rounded-md focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mb-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
          >
            Log In
          </button>
        </form>

        <p className="text-center text-sm">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
}
