import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeUnitAction } from '../../actions';
import { AiFillHome } from 'react-icons/ai';
import { BsFillBookmarkHeartFill } from 'react-icons/bs';
import { RiCelsiusFill } from 'react-icons/ri';
import { RiFahrenheitFill } from 'react-icons/ri';

const Header = () => {
  const dispatch = useDispatch();
  let tempUnit = localStorage.getItem('tempUnit');

  const changeUnit = () => {
    if (tempUnit === 'C') {
      tempUnit = 'F';
      dispatch(changeUnitAction('F'));
      localStorage.setItem('tempUnit', 'F');
    } else {
      tempUnit = 'C';
      dispatch(changeUnitAction('C'));
      localStorage.setItem('tempUnit', 'C');
    }
  };

  return (
    <div className='header'>
      <h3 style={{ marginLeft: '1rem' }}> Weather App</h3>
      <div className='buttons'>
        <button type='button' onClick={changeUnit}>
          {tempUnit === 'C' ? (
            <RiCelsiusFill size='1.5rem' color='cornFlowerBlue' />
          ) : (
            <RiFahrenheitFill size='1.5rem' color='cornFlowerBlue' />
          )}
        </button>
        <Link to='/'>
          <button type='button'>
            <AiFillHome size='2rem' color='cornFlowerBlue' />
          </button>
        </Link>
        <Link to='/bookmarks'>
          <button type='button'>
            {' '}
            <BsFillBookmarkHeartFill size='2rem' color='cornFlowerBlue' />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
