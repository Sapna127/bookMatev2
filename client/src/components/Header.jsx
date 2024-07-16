import React from 'react';

function Header({ label }) {
  return (
    <div className='w-full h-50 bg-slate-50 text-xxl p-4 pt-3'>
      <h1 className='font-bold text-4xl text-center'>{label}</h1>
      <hr className="border-t border-gray-300 mt-2" />
    </div>
  );
}

export default Header;
