import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../style';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // Add signup logic here, e.g., API call
    console.log('Signup form data:', formData);
    navigate('/onboarding');
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-gradient-to-br from-gray-800 to-black p-8 rounded-lg shadow-lg w-full max-w-md mx-auto text-white relative">
        <div className="flex justify-center mb-6">
          <div className="bg-gray-900 p-4 rounded-full">
            <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full">
              <div className="bg-black w-12 h-12 rounded-full"></div>
            </div>
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-2 text-center">Signup</h1>
        <p className="text-center mb-6">Create your account to get started</p>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label htmlFor="username" className="block font-bold mb-2">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-bold mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-bold mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Signup
            </button>
            <button
              type="button"
              onClick={handleLoginRedirect}
              className="text-gray-400 hover:text-white font-bold py-2 px-4 rounded focus:outline-none"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
