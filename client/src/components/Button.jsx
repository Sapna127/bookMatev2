import React from 'react';

function Button({ label }) {
  return (
    <button 
      type="button" 
      className="focus:outline-none text-lg rounded-lg text-white hover:text-black bg-black hover:bg-white focus:ring-4 focus:ring-gray-300 font-medium text-sm px-5 py-3 me-2 mb-2 dark:focus:ring-yellow-900"
    >
      {label}
    </button>
  );
}

export default Button;
