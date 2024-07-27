import React, { useState, useContext } from 'react';
import axios from 'axios';
// import { UserContext } from '../contexts/UserContext';

function Signin({ switchToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const { signin } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/users/login', {
        email,
        password,
      });
      console.log(response.status)
      if (response.status === 201) {
        signin(response.data); 
        console.log('Signin successful', response.data);
      } else {
        console.error('Signin error', response.statusText);
      }
    } catch (error) {
      console.error('Network error', error.message);
      console.error('Error details:', error.response ? error.response.data : 'No response data');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAEFE3]">
      <div className="flex flex-col pt-5 pb-0 items-center justify-center space-y-5 p-10 bg-white shadow-md rounded-md w-full max-w-md h-[300px]">
        <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-5 w-full">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-16 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-16 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
          />
          <button
            type="submit"
            className="w-full h-12 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={switchToSignup}
            className="w-full h-12 px-4 py-2 text-blue-600 hover:underline"
          >
            New user? Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signin;
