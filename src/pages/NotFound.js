import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {

  return (
    <div>
      Page not found
      <Link to="/">
        <button>Go back home</button>
      </Link>
    </div>
  );
}

export default NotFound;