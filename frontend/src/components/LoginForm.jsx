import React, { useState } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Logging in with:', formData);

    try {
      const response = await axios.post('http://localhost:5000/login', formData);
      const { accessToken, refreshToken } = response.data.tokens;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      alert('Login successful!');
      navigate('/posts');
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <form onSubmit={handleSubmit} className="bg-white border border-orange-200 p-8 rounded-2xl shadow-md">
          <h1 className="text-4xl font-extrabold text-center mb-8 text-orange-500 drop-shadow-sm">
            Connect Potato 🥔
          </h1>

          {/* Email input */}
          <div className="mb-4">
            <div className="flex items-center border border-orange-200 bg-orange-50 px-3 py-2 rounded-xl text-sm focus-within:ring-2 focus-within:ring-orange-300">
              <FiMail className="text-orange-400 mr-2" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
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
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-transparent outline-none placeholder-orange-300 text-gray-800"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 rounded-full text-sm transition duration-200 shadow"
          >
            Log In
          </button>

          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-orange-200" />
            <span className="px-2 text-sm text-orange-400">OR</span>
            <div className="flex-grow h-px bg-orange-200" />
          </div>

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
