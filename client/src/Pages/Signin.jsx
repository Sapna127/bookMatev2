import React, { useState } from 'react';
import axios from 'axios';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/users/login', {
        email,
        password,
      });

      if (response.status === 200) {
        console.log('Signin successful', response.data);
        // Handle successful sign-in (e.g., redirect or show a message)
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
            className="w-full h-12 px-4 py-2 text-white bg-black rounded-lg hover:bg-black"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signin;
