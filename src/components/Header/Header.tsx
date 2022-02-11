import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeUnitAction } from '../../actions';
import { RootState } from '../../store';
import { AiFillHome } from 'react-icons/ai';
import { BsFillBookmarkHeartFill } from 'react-icons/bs';
import { RiCelsiusFill } from 'react-icons/ri';
import { RiFahrenheitFill } from 'react-icons/ri';

const Header = () => {
  const dispatch = useDispatch();
  const tempUnit = useSelector((state: RootState) => state.tempUnit.unit);

  const changeUnit = () => {
    if (tempUnit === 'C') {
      dispatch(changeUnitAction('F'));
    } else {
      dispatch(changeUnitAction('C'));
    }
    localStorage.setItem('tempUnit', tempUnit);
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
        <Link to='/favourites'>
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
