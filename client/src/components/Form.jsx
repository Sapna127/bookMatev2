import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
// import { UserContext } from '../contexts/UserContext';
import Inputbox from './Inputbox';
import FileUpload from './FileUpload';

function Form() {
  // const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: '',
    author: '',
    publication: '',
    tags: '',
    description: '',
    pictures: [],
    sellerId: '', // Initialize as an empty string
  });

  // useEffect(() => {
  //   if (user) {
  //     console.log('User from context:', user);
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       sellerId: user._id, 
  //     }));
  //   }
  //   console.log('Form data:', formData);
  // }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileUpload = (file) => {
    const url = URL.createObjectURL(file);
    setFormData({
      ...formData,
      pictures: [...formData.pictures, url],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data to be submitted:', formData); // Log formData before sending
    // console.log('User from context:', user);
    try {
      const response = await axios.post('http://localhost:3000/api/v1/books', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Form data submitted:', response.data);
      // Handle successful submission (e.g., show a success message or redirect)
    } catch (error) {
      console.error('Error submitting form data:', error.response ? error.response.data : error.message);
      // Handle submission error (e.g., show an error message)
    }
  };


  return (
    <div className="min-h-screen flex flex-col pt-5 pb-0 items-center space-y-5 bg-gray-100">
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-5 bg-white p-8 rounded shadow-lg">
        <div className="flex flex-col space-y-4 w-full">
          <Inputbox label="Book Name" name="name" value={formData.name} onChange={handleChange} />
          <Inputbox label="Author" name="author" value={formData.author} onChange={handleChange} />
          <Inputbox label="Publication" name="publication" value={formData.publication} onChange={handleChange} />
          <Inputbox label="Tags (comma separated)" name="tags" value={formData.tags} onChange={handleChange} />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full h-32 px-3 py-2 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
          />
        </div>
        <FileUpload onUpload={handleFileUpload} />
        <div className="w-full">
          <h3 className="text-lg font-medium">Uploaded Images</h3>
          <div className="flex flex-wrap space-x-4 mt-2">
            {formData.pictures.map((url, index) => (
              <img key={index} src={url} alt={`Uploaded ${index}`} className="w-32 h-32 object-cover rounded-lg" />
            ))}
          </div>
        </div>
        <button type="submit" className="px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
          Send
        </button>
      </form>
    </div>
  );
}

export default Form;
