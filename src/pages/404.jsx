import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <h1>404. This page does not exist.</h1>
      <Link to='/user'>Go back {'<'} </Link>
    </div>
  );
};

export default NotFound;