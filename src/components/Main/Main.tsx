import React from 'react';
import './Main.css';
import Search from '../Search/Search';
import Forecast from '../Forecast/Forecast';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Main = () => {
  const error = useSelector((state: RootState) => state.error.error);

  return error ? (
    <div className='error'>
      There was a problem with Accuweather API, please wait for a fix: {error}
    </div>
  ) : (
    <>
      <Search />
      <Forecast />
    </>
  );
};

export default Main;
