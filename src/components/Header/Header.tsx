import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeUnitAction } from '../../actions';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Header = () => {
  const dispatch = useDispatch();
  const tempUnit = useSelector((state: RootState) => state.tempUnit.unit);

  const changeUnit = () => {
    if (tempUnit === 'C') {
      dispatch(changeUnitAction('F'));
    } else {
      dispatch(changeUnitAction('C'));
    }
  };
  return (
    <div className='header'>
      Weather App
      <div className='buttons'>
        <button onClick={changeUnit}>C/F</button>
        <Link to='/'>Home</Link>
        <Link to='/favourites'>Favourites</Link>
      </div>
    </div>
  );
};

export default Header;
