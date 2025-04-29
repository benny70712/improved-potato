import React, { useState } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with:', { email, password });
    // Connect to backend login route here
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-orange-200 p-8 rounded-2xl shadow-md"
        >
          {/* Connect Potato Title */}
          <h1 className="text-4xl font-extrabold text-center mb-8 text-orange-500 drop-shadow-sm">
            Connect Potato 🥔
          </h1>

          {/* Email input */}
          <div className="mb-4">
            <div className="flex items-center border border-orange-200 bg-orange-50 px-3 py-2 rounded-xl text-sm focus-within:ring-2 focus-within:ring-orange-300">
              <FiMail className="text-orange-400 mr-2" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent outline-none placeholder-orange-300 text-gray-800"
              />
            </div>
          </div>

          {/* Password input */}
          <div className="mb-6">
            <div className="flex items-center border border-orange-200 bg-orange-50 px-3 py-2 rounded-xl text-sm focus-within:ring-2 focus-within:ring-orange-300">
              <FiLock className="text-orange-400 mr-2" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-transparent outline-none placeholder-orange-300 text-gray-800"
              />
            </div>
          </div>

          {/* Log In button */}
          <button
            type="submit"
            className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 rounded-full text-sm transition duration-200 shadow"
          >
            Log In
          </button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-orange-200" />
            <span className="px-2 text-sm text-orange-400">OR</span>
            <div className="flex-grow h-px bg-orange-200" />
          </div>

          {/* Sign up link */}
          <p className="text-center text-sm text-orange-500">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-orange-600 font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
