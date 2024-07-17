import React from 'react';
import Header from '../components/Header';
import BookContainer from '../components/BookContainer';
import Button from '../components/Button';

function AllBooks() {
  return (
    <>
      <Header label="Books For Sell" />
      <div className='pt-12 flex flex-col gap-5'>
        <BookContainer label="Computer Science" />
        <BookContainer label="Computer Science" />
        <BookContainer label="Computer Science" />
        
        <div className='flex flex-col justify-center items-center gap-5 bg-[#FAEFE3] ml-10 mb-10 mr-10 mt-10 p-16 w-[1320px]'>
          <h1 className="text-[30px] font-bold text-gray-800 text-center">
            Want to sell your book?
          </h1>
          <Button label="Post an ad" />
        </div>
      </div>
    </>
  );
}

export default AllBooks;
