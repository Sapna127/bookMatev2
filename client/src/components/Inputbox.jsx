import React from 'react';

export default function Inputbox({ label, name, value, onChange }) {
  return (
    <div className="w-full">
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={label}
        className="h-10 px-3 w-full text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
      />
    </div>
  );
}
