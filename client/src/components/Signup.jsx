import React, { useContext, useState } from 'react';
import axios from 'axios';
// import { UserContext } from '../contexts/UserContext';

function Signup({ switchToSignin }) {
  // const { signin } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/users/register', formData);

      if (response.status === 201) {
        signin(response.data); 
        // switchToSignin();
      } else {
        console.error('Signup error', response.statusText);
      }
    } catch (error) {
      console.error('Network error');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-5">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full h-16 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full h-16 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full h-16 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
        />
        <div className="flex flex-col items-start space-y-3 mt-5 w-full">
          <label className="font-semibold text-lg">What do you want to do?</label>
          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="role"
                value="buyer"
                checked={formData.role === 'buyer'}
                onChange={handleChange}
                className="form-radio text-blue-600 h-5 w-5"
              />
              <span className="ml-2">Buyer</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="role"
                value="seller"
                checked={formData.role === 'seller'}
                onChange={handleChange}
                className="form-radio text-blue-600 h-5 w-5"
              />
              <span className="ml-2">Seller</span>
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="w-full h-12 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Sign Up
        </button>
      </form>
      <button onClick={switchToSignin}>Already have an account? Sign in</button>
    </div>
  );
}

export default Signup;
