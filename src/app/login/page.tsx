/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { auth } from '../../../firebase/firebase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [, setLoading] = useState(false);
  const router = useRouter();

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await handleUser(userCredential.user);
      router.push("/blogadmindashboard");
    } catch (err: unknown) {
      setError((err as Error).message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleProviderLogin = async (provider: GoogleAuthProvider | GithubAuthProvider) => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      await handleUser(userCredential.user);
      router.push("/blogadmindashboard");
    } catch (err: unknown) {
      setError((err as Error).message || "Login failed");
    }
  };

  const handleUser = async (user: any) => {
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);
    if (!docSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName || "New User",
        email: user.email,
        photoURL: user.photoURL || "",
        bio: "Hello, I am a blogger!",
        followers: [],
        following: [],
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-center mb-6">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="text-sm">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 bg-gray-200 rounded focus:ring-2 focus:ring-blue-600"
              placeholder="Email"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="text-sm">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 bg-gray-200 rounded focus:ring-2 focus:ring-blue-600"
              placeholder="Password"
              required
            />
          </div>

          <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Log In
          </button>
        </form>

        <div className="mt-4">
        <button 
  onClick={() => handleProviderLogin(googleProvider)} 
  className="w-full py-2 mb-2 bg-gray-900 text-white rounded-lg shadow-md border border-gray-700
             transition-all duration-300 ease-in-out 
             hover:bg-gray-800 hover:border-gray-500 hover:shadow-lg hover:scale-105"
>
  🚀 Login with Google
</button>

<button 
  onClick={() => handleProviderLogin(githubProvider)} 
  className="w-full py-2 bg-gray-800 text-white rounded-lg shadow-md border border-gray-700
             transition-all duration-300 ease-in-out
             hover:bg-gray-700 hover:border-gray-500 hover:shadow-lg hover:scale-105"
>
  🖤 Login with GitHub
</button>
        </div>

        <p className="text-center mt-4 text-sm">
          New here?{' '}
          <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
}
