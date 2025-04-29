import React, { useState } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with:', { email, password });
    // Connect to backend login route here
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-300 p-8 rounded-md"
        >
          {/* Instagram-style title */}
          <h1 className="text-4xl font-extrabold text-center mb-8 font-sans text-gray-800 tracking-tight">
            Cookie pookie
          </h1>

          {/* Email input */}
          <div className="mb-4">
            <div className="flex items-center border bg-gray-50 px-3 py-2 rounded text-sm focus-within:ring-1 focus-within:ring-gray-400">
              <FiMail className="text-gray-400 mr-2" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>

          {/* Password input */}
          <div className="mb-6">
            <div className="flex items-center border bg-gray-50 px-3 py-2 rounded text-sm focus-within:ring-1 focus-within:ring-gray-400">
              <FiLock className="text-gray-400 mr-2" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>

          {/* Log In button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded text-sm transition duration-200"
          >
            Log In
          </button>

          {/* Divider line */}
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="px-2 text-sm text-gray-400">OR</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          {/* Footer */}
          <p className="text-center text-s text-gray-500">
            Don't have an account? <a href="#" className="text-blue-500">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
