import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='header'>
      Weather App
      <Link to='/favourites'>Favourites</Link>
    </div>
  );
};

export default Header;
