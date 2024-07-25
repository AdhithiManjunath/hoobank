// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     // Mock login validation
//     if (formData.email === 'user@example.com' && formData.password === 'password') {
//       navigate('/onboarding');
//     } else {
//       setError('Invalid email or password');
//     }
//   };

//   const handleSignupRedirect = () => {
//     navigate('/signup');
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-black">
//       <div className="bg-gradient-to-br from-gray-800 to-black p-8 rounded-lg shadow-lg w-full max-w-md mx-auto text-white relative">
//         <div className="flex justify-center mb-6">
//           <div className="bg-gray-900 p-4 rounded-full">
//             <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full">
//               <div className="bg-black w-12 h-12 rounded-full"></div>
//             </div>
//           </div>
//         </div>
//         <h1 className="text-2xl font-bold mb-2 text-center">Sign in</h1>
//         <p className="text-center mb-6">Keep it all together and you'll be fine</p>
//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <label htmlFor="email" className="block font-bold mb-2">E-mail or phone</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="password" className="block font-bold mb-2">Password</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
//             />
//           </div>
//           {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
//           <div className="flex justify-between items-center mb-4">
//             <a href="#" className="text-gray-400 text-sm hover:text-white">Forgot Password</a>
//           </div>
//           <button
//             type="submit"
//             className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
//           >
//             Sign in
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
