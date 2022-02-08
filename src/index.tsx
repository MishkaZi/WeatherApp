import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Favourites from './components/Favourites/Favourites';
import Main from './components/Main/Main';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/favourites' element={<Favourites />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
