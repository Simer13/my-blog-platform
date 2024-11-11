import React from 'react';

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-white mb-6">Create an Account</h2>
        
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="text-sm text-gray-300">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-3 mt-2 text-white bg-gray-800 rounded-md focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your full name"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="email" className="text-sm text-gray-300">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 mt-2 text-white bg-gray-800 rounded-md focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your email"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="text-sm text-gray-300">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-3 mt-2 text-white bg-gray-800 rounded-md focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your password"
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-3 mb-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>
        
        <div className="flex items-center justify-between mb-6">
          <div className="border-t border-gray-300 w-full"></div>
          <span className="text-sm text-gray-400 px-3">Or</span>
          <div className="border-t border-gray-300 w-full"></div>
        </div>
        
        <div className="flex justify-center space-x-4 mb-6">
          <button className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5 mr-2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.25 3.44 9.66 8.12 11.14.59.11.81-.25.81-.55V18.8c-3.3.72-4-1.41-4-1.41-.54-1.37-1.33-1.73-1.33-1.73-1.09-.73.08-.72.08-.72 1.21.08 1.85 1.24 1.85 1.24 1.07 1.81 2.81 1.29 3.5 1.06 1.05-.76 1.77-1.19 2.2-1.23.1.44.4.88.8.88h.02c2.57 0 4.58-2.07 4.58-4.58 0-.07 0-.14-.01-.21.56-.41.97-.92 1.23-1.53-.57-.23-1.18-.36-1.81-.36-1.36 0-2.53.51-3.47 1.35-.45-.61-.67-1.33-.67-2.08C16.57 8.07 18 6.67 18 6c0-.29-.06-.57-.17-.83-.68-.11-1.4-.17-2.16-.17z" />
            </svg>
            Google
          </button>
          <button className="flex items-center px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:ring-2 focus:ring-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5 mr-2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M23 12.073C23 5.379 18.627 0 12 0S1 5.379 1 12c0 5.509 3.894 10.15 9.047 11.735.661.121.901-.282.901-.63V18.12c-3.606.758-4-1.583-4-1.583-.64-1.625-1.562-2.07-1.562-2.07-1.276-.872.097-.858.097-.858 1.408.1 2.145 1.438 2.145 1.438 1.247 2.134 3.337 1.518 4.148 1.095.127-.91.486-1.518.881-1.869-3.302-.378-6.746-1.652-6.746-7.356 0-1.63.586-2.958 1.547-4.004-.154-.377-.673-1.898-.138-3.949 0 0 1.214-.397 3.967 1.515 1.15-.319 2.373-.478 3.585-.478 1.213 0 2.433.159 3.585.478 2.748-1.912 3.962-1.515 3.962-1.515.533 2.051.016 3.572-.137 3.949 1.082 1.046 1.7 2.374 1.7 4.004 0 5.721-3.453 6.972-6.748 7.352.5.431.939 1.271.939 2.553v3.278c0 .347.24.754.91.63C19.106 22.223 23 17.582 23 12.073z" />
            </svg>
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
