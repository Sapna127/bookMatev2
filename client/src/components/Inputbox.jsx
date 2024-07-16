import React from 'react';

export default function Inputbox({ label }) {
  return (
    <form>
      <input
        type="text"
        placeholder={label}
        className="w-[500px] h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
      />
    </form>
  );
}

// export default Inputbox;
