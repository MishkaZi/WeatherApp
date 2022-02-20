import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bookmarksAction } from '../../actions';
import { RootState } from '../../store';
import BookmarkCard from '../BookmarkCard/BookmarkCard';
import Header from '../Header/Header';
import './Bookmarks.css';

const Bookmarks = () => {
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
      <div className='bookmarks'>
        {bookmarks.map((bm) => {
          console.log(bm);

          return (
            <div key={bm.id}>
              <BookmarkCard {...bm} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Bookmarks;
