import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bookmarksAction } from '../../actions';
import { RootState } from '../../store';
import Header from '../Header/Header';

const Favourites = () => {
  const dispatch = useDispatch();
  const bookmarks = useSelector(
    (state: RootState) => state.bookmarks.bookmarks
  );
  console.log(bookmarks);

  useEffect(() => {
    dispatch(bookmarksAction());
  }, [dispatch]);

  return (
    <>
      <Header />
    </>
  );
};

export default Favourites;
