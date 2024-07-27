import React, { useState } from 'react';
import axios from 'axios';
import Inputbox from '../components/Inputbox';
import Button from '../components/Button';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'radio' ? (checked ? value : prevData[name]) : value
    }));
    console.log(`Field changed: ${name} = ${value}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    try {
      const response = await axios.post('http://localhost:3000/api/v1/users/register', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

    } catch (error) {
      console.error('Network error', error.message);
      // Handle network error (e.g., show an error message)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAEFE3]">
      <div className="flex flex-col items-center space-y-5 p-10 bg-white shadow-md rounded-md w-full max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-5">
          <Inputbox label="Name" name="name" value={formData.name} onChange={handleChange} />
          <Inputbox label="Email" name="email" value={formData.email} onChange={handleChange} />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
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
                <span className="ml-2">buyer</span>
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
                <span className="ml-2">seller</span>
              </label>
            </div>
          </div>
          <button type="submit" onClick={handleSubmit} className="w-full h-12 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
