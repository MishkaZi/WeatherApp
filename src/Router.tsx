import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Favourites from './components/Favourites/Favourites';
import Main from './components/Main/Main';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/favourites' element={<Favourites />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
