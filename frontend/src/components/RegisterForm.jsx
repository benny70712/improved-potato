import React, { useState } from 'react';
import { FiUser, FiMail, FiLock, FiCalendar, FiChevronDown } from 'react-icons/fi';

const RegisterForm = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registering user:', formData);
    // Connect to backend
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-300 p-8 rounded-md"
        >
          {/* Title */}
          <h1 className="text-4xl font-extrabold text-center mb-8 font-sans text-gray-800 tracking-tight">
            Potato Register
          </h1>

          {/* Subtitle */}
          <p className="text-center text-sm text-gray-500 mb-6">
            Sign up to see photos and videos from your friends.
          </p>

          {/* Username */}
          <div className="mb-3">
            <div className="flex items-center border bg-gray-50 px-3 py-2 rounded text-sm focus-within:ring-1 focus-within:ring-gray-400">
              <FiUser className="text-gray-400 mr-2" />
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
            <div className="flex items-center border bg-gray-50 px-3 py-2 rounded text-sm focus-within:ring-1 focus-within:ring-gray-400">
              <FiMail className="text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                placeholder="Mobile Number or Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <div className="flex items-center border bg-gray-50 px-3 py-2 rounded text-sm focus-within:ring-1 focus-within:ring-gray-400">
              <FiLock className="text-gray-400 mr-2" />
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
            <label className="block text-xs text-gray-500 mb-1 ml-1">Birthday</label>
            <div className="flex gap-2">
              <input
                type="number"
                name="day"
                placeholder="Day"
                min="1"
                max="31"
                value={formData.birthday.day}
                onChange={handleChange}
                className="w-1/3 border border-gray-300 bg-gray-50 text-sm px-3 py-2 rounded outline-none focus:ring-1 focus:ring-gray-400"
              />
              <div className="relative w-1/3">
                <select
                  name="month"
                  value={formData.birthday.month}
                  onChange={handleChange}
                  className="w-full appearance-none border border-gray-300 bg-gray-50 text-sm px-3 py-2 rounded outline-none focus:ring-1 focus:ring-gray-400"
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
                <FiChevronDown className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              <input
                type="number"
                name="year"
                placeholder="Year"
                min="1900"
                max={new Date().getFullYear()}
                value={formData.birthday.year}
                onChange={handleChange}
                className="w-1/3 border border-gray-300 bg-gray-50 text-sm px-3 py-2 rounded outline-none focus:ring-1 focus:ring-gray-400"
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
              className="w-full appearance-none border border-gray-300 bg-gray-50 text-sm px-3 py-2 rounded outline-none focus:ring-1 focus:ring-gray-400"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <FiChevronDown className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded text-sm transition duration-200"
          >
            Sign Up
          </button>

          {/* Divider line */}
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="px-2 text-sm text-gray-400">OR</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          {/* Terms & policies */}
          <p className="text-center text-s text-gray-500">
             Have an account? <a href="#" className="text-blue-500 font-semibold">Log in</a>
          </p>
        </form>

   
      </div>
    </div>
  );
};

export default RegisterForm;
