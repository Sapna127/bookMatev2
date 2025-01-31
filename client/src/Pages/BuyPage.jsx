import React from 'react';
import Header from '../components/Header';
import BookContainer from '../components/BookContainer';
import Buybtn from '../components/Buybtn';
function BuyPage() {
  return (
    <>
      <Header label="Book Info" />
      <div className="flex flex-row  justify-center gap-[50px] p-10">
      <div className="w-[300px] max-w-sm border bg-white border-gray-200 rounded-lg shadow "/>
        <div className="flex flex-col ml-4 w-[300px] gap-y-4">
          <div className='flex flex-row'>
            <div><h1 className="text-[30px] font-bold text-gray-800">Artificial Intelligence</h1>
            <p className='text-lg'>Robert Loius</p></div>
            <h1 className='text-[30px]'>130</h1>
          </div>
          <p className="mb-4">This book explores the potential consequences of Artificial Intelligence and how it will shape the world in the coming years. It familiarizes how AI aims to aid human cognitive limitations. It covers:</p>
          <div className='flex flex-row w-full gap-3'> 
          <button
            type="button"
            className="text-black  bg-white hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2 w-full"
          >
            <svg width="30" height="30" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.75 36.75H36.75V31.5H15.75V36.75ZM15.75 28.875H47.25V23.625H15.75V28.875ZM15.75 21H47.25V15.75H15.75V21ZM5.25 57.75V10.5C5.25 9.05625 5.7645 7.81987 6.7935 6.79087C7.82075 5.76362 9.05625 5.25 10.5 5.25H52.5C53.9437 5.25 55.1801 5.76362 56.2091 6.79087C57.2364 7.81987 57.75 9.05625 57.75 10.5V42C57.75 43.4437 57.2364 44.6801 56.2091 45.7091C55.1801 46.7364 53.9437 47.25 52.5 47.25H15.75L5.25 57.75Z" fill="black"/>
            </svg>
            Chat with seller
          </button>
          {/* <Buybtn/> */}
          </div>
        </div>
      </div>
      <BookContainer label="Similar Books"/>
    </>
  );
}

export default BuyPage;
