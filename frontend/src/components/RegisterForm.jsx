import React, { useState } from 'react';
import { FiUser, FiMail, FiLock, FiCalendar, FiChevronDown } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';




const RegisterForm = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: '',
    birthday: { day: '', month: '', year: '' },
    gender: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (['day', 'month', 'year'].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        birthday: {
          ...prev.birthday,
          [name]: value,
        },
      }));

    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/register', formData);
      console.log('Registration successful:', response.data);
  
      // Optionally show a success message or redirect
      alert('Registration successful!');
  
      // Reset the form
      setFormData({
        userName: '',
        birthday: { day: '', month: '', year: '' },
        gender: '',
        email: '',
        password: '',
      });

      navigate('/login');
  
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Something went wrong. Please try again.');
    }
    


  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-orange-200 p-8 rounded-2xl shadow-md"
        >
          {/* Title */}
          <h1 className="text-4xl font-extrabold text-center mb-8 font-sans text-orange-500 tracking-tight">
            Potato Register
          </h1>

          {/* Subtitle */}
          <p className="text-center text-sm text-orange-400 mb-6">
            Sign up to see photos and videos from your friends.
          </p>

          {/* Username */}
          <div className="mb-3">
            <div className="flex items-center border bg-orange-50 px-3 py-2 rounded text-sm focus-within:ring-1 focus-within:ring-orange-300">
              <FiUser className="text-orange-400 mr-2" />
              <input
                type="text"
                name="userName"
                placeholder="Username"
                value={formData.userName}
                onChange={handleChange}
                required
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-3">
            <div className="flex items-center border bg-orange-50 px-3 py-2 rounded text-sm focus-within:ring-1 focus-within:ring-orange-300">
              <FiMail className="text-orange-400 mr-2" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <div className="flex items-center border bg-orange-50 px-3 py-2 rounded text-sm focus-within:ring-1 focus-within:ring-orange-300">
              <FiLock className="text-orange-400 mr-2" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>

          {/* Birthday */}
          <div className="mb-4">
            <label className="block text-xs text-orange-400 mb-1 ml-1">Birthday</label>
            <div className="flex gap-2">
              <input
                type="number"
                name="day"
                placeholder="Day"
                min="1"
                max="31"
                value={formData.birthday.day}
                required
                onChange={handleChange}
                className="w-1/3 border border-orange-200 bg-orange-50 text-sm px-3 py-2 rounded outline-none focus:ring-1 focus:ring-orange-300"
              />
              <div className="relative w-1/3">
                <select
                  name="month"
                  value={formData.birthday.month}
                  required
                  onChange={handleChange}
                  className="w-full appearance-none border border-orange-200 bg-orange-50 text-sm px-3 py-2 rounded outline-none focus:ring-1 focus:ring-orange-300"
                >
                  <option value="">Month</option>
                  {[
                    'January', 'February', 'March', 'April',
                    'May', 'June', 'July', 'August',
                    'September', 'October', 'November', 'December'
                  ].map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                <FiChevronDown className="absolute top-1/2 right-3 transform -translate-y-1/2 text-orange-400 pointer-events-none" />
              </div>
              <input
                type="number"
                name="year"
                placeholder="Year"
                min="1900"
                max={new Date().getFullYear()}
                value={formData.birthday.year}
                onChange={handleChange}
                required
                className="w-1/3 border border-orange-200 bg-orange-50 text-sm px-3 py-2 rounded outline-none focus:ring-1 focus:ring-orange-300"
              />
            </div>
          </div>

          {/* Gender */}
          <div className="mb-6 relative">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full appearance-none border border-orange-200 bg-orange-50 text-sm px-3 py-2 rounded outline-none focus:ring-1 focus:ring-orange-300"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <FiChevronDown className="absolute top-1/2 right-3 transform -translate-y-1/2 text-orange-400 pointer-events-none" />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 rounded-full text-sm transition duration-200 shadow"
          >
            Sign Up
          </button>

          {/* Divider line */}
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-orange-200" />
            <span className="px-2 text-sm text-orange-400">OR</span>
            <div className="flex-grow h-px bg-orange-200" />
          </div>

          {/* Already have account */}
          <p className="text-center text-sm text-orange-500">
            Have an account?{' '}
             <Link to="/login" className="text-orange-600 font-medium hover:underline">
                          Log In
              </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
