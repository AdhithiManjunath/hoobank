import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../style';
import useUserStore from '../store/userStore';
import axios from 'axios';


const Signup = () => {
  const navigate = useNavigate();
  // hook cannot be created or called inside a function 
  const setUser = useUserStore((state) => state.setUser);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
    const response = await axios.post('http://localhost:5000/api/admin/addUser', formData);

    if (response.status === 409) {
      // Custom logic for status code 409 (Conflict)
      console.log('User with this email already exists');
      // Optionally, you can handle this scenario with Zustand as well
    } else if (response.status === 201) {
      // Extract user information from the response
      const { user_id, username, email } = response.data.user;
     

      // Store user information in Zustand
      setUser({ user_id, username, email });

      console.log('New user created:', { user_id, username, email });
       navigate('/onboarding');
    } else {
      // Handle other status codes if needed
      console.error('Unexpected status code:', response.status);
    }
  } catch (error) {
    console.error('Error adding user:', error);
  }
    
    
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <>
   
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
              <label htmlFor="username" className="block font-bold mb-2">
                Username
              </label>
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
              <label htmlFor="email" className="block font-bold mb-2">
                Email
              </label>
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
    </>
  );
};

export default Signup;
