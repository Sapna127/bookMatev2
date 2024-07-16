import React from 'react';
import Inputbox from './Inputbox';
import FileUpload from './FileUpload';
import Button from './Button';
function Form() {
  return (
    <div className="min-h-screen flex flex-col pt-5 pb-0 items-center space-y-5">
      <div className="flex flex-row justify-center space-x-4">
        <Inputbox label="Book Name" />
        <Inputbox label="Author / Publication" />
      </div>
      <input
        type="text"
        placeholder="Description"
        className="w-[1010px] h-16 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
      />
      <FileUpload />
      <input
        type="text"
        placeholder="Address"
        className="w-[1010px] h-16 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
      />
      <div className="flex flex-row justify-center space-x-4">
        <Inputbox label="City" />
        <Inputbox label="PinCode" />
      </div>
      <Button label="Send"/>
    </div>
  );
}

export default Form;
