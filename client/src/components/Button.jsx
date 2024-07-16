import React from 'react'

function Button({label}) {
  return (
    <button type="button" class="focus:outline-none text-lg rounded-full text-white hover:text-black bg-black hover:bg-white focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-3 me-2 mb-2 dark:focus:ring-yellow-900 w-[100px]">{label}</button>
  )
}

export default Button