import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeUnitAction, themeAction } from '../../actions';
import { AiFillHome } from 'react-icons/ai';
import {
  BsFillBookmarkHeartFill,
  BsFillMoonFill,
  BsFillSunFill,
} from 'react-icons/bs';
import { RiCelsiusFill } from 'react-icons/ri';
import { RiFahrenheitFill } from 'react-icons/ri';
import { RootState } from '../../store';

const Header = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const tempUnit = useSelector((state: RootState) => state.tempUnit.unit);

  const changeUnit = () => {
    if (tempUnit === 'C') {
      dispatch(changeUnitAction('F'));
      localStorage.setItem('tempUnit', 'F');
    } else {
      dispatch(changeUnitAction('C'));
      localStorage.setItem('tempUnit', 'C');
    }
  };

  const lightDark = () => {
    if (theme === 'light') {
      dispatch(themeAction('dark'));
      localStorage.setItem('theme', 'dark');
    } else {
      dispatch(themeAction('light'));
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className={`header-${theme}`}>
      <h3 style={{ marginLeft: '1rem' }}> Weather App</h3>
      <div className='buttons'>
        <button type='button' onClick={lightDark}>
          {theme === 'light' ? (
            <BsFillSunFill size='1.5rem' color='cornFlowerBlue' />
          ) : (
            <BsFillMoonFill size='1.5rem' color='cornFlowerBlue' />
          )}
        </button>
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
