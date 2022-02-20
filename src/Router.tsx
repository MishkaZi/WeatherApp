import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Bookmarks from './components/Bookmarks/Bookmarks';
import Main from './components/Main/Main';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/bookmarks' element={<Bookmarks />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
