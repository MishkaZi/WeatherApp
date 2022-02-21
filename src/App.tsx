import React from 'react';
import Router from './Router';
import { useDispatch, useSelector } from 'react-redux';
import { bookmarksAction, changeUnitAction, themeAction } from './actions';
import './App.css';
import { RootState } from './store';

const App = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);

  if (localStorage.getItem('tempUnit') !== undefined) {
    dispatch(changeUnitAction(localStorage.getItem('tempUnit')));
  }
  if (localStorage.getItem('theme') !== undefined) {
    dispatch(themeAction(localStorage.getItem('theme')));
  }
  dispatch(bookmarksAction());
  return (
    <div className={`body-${theme}`}>
      <Router />
    </div>
  );
};

export default App;
