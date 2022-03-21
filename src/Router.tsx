import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Bookmarks from './components/Bookmarks/Bookmarks';
import Header from './components/Header/Header';
import Main from './components/Main/Main';

const Router = () => {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path='/WeatherApp' element={<Main />} />
        <Route path='/WeatherApp/bookmarks' element={<Bookmarks />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
