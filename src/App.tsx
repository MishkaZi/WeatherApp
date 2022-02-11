import React from 'react';
import Router from './Router';
import { useDispatch } from 'react-redux';
import { changeUnitAction } from './actions';

const App = () => {
  const dispatch = useDispatch();
  if (localStorage.getItem('tempUnit') !== undefined) {
    dispatch(changeUnitAction(localStorage.getItem('tempUnit')));
  }
  return <Router />;
};

export default App;
