import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='text-center font-bold w-screen h-screen flex items-center justify-center flex-col p-4'>
      <h1 className='text-9xl font-black mb-4'>404</h1>
      <h1 className='uppercase text-3xl font-black mb-4'>
        This page does not exist.
      </h1>
      <Link
        to='/login'
        className='text-2xl text-purple-700 flex items-center gap-4'
      >
        Go to Login <FaArrowLeft />
      </Link>
    </div>
  );
};

export default NotFound;
