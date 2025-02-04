"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../../firebase/firebase'; // Make sure you export db from firebase config
import { setDoc, doc } from 'firebase/firestore';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Store additional user data in Firestore
      const user = userCredential.user;
      await setDoc(doc(db, 'users', user.uid), {
        name: name,
        email: email,
        createdAt: new Date(),
      });

      // Redirect user to the dashboard or home page after successful sign up
      router.push('/dashboard');  // Replace '/dashboard' with your desired route
    } catch (err: unknown) {
      setError((err as Error).message || 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6">
      <div className="w-full max-w-md p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-white mb-6">Create an Account</h2>

        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label htmlFor="name" className="text-sm text-gray-300">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 mt-2 text-white bg-gray-800 rounded-md focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="text-sm text-gray-300">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-2 text-white bg-gray-800 rounded-md focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="text-sm text-gray-300">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-2 text-white bg-gray-800 rounded-md focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 mb-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        <div className="flex items-center justify-between mb-6">
          <div className="border-t border-gray-300 w-full"></div>
          <span className="text-sm text-gray-400 px-3">Or</span>
          <div className="border-t border-gray-300 w-full"></div>
        </div>

        <div className="flex justify-center flex-wrap space-x-4 space-y-4 sm:space-y-0 mb-6">
          {/* Optional Google or GitHub buttons */}
          <button className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 w-full sm:w-auto">
            Google
          </button>
          <button className="flex items-center px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 w-full sm:w-auto">
            Github
          </button>
        </div>

        <p className="text-center text-sm text-gray-400">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 hover:underline">Log in</a>
        </p>
      </div>
    </div>
  );
}
