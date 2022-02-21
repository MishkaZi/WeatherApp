import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bookmarksAction } from '../../actions';
import { RootState } from '../../store';
import BookmarkCard from '../BookmarkCard/BookmarkCard';
import './Bookmarks.css';

const Bookmarks = () => {
  const dispatch = useDispatch();
  const bookmarks = useSelector(
    (state: RootState) => state.bookmarks.bookmarks
  );

  useEffect(() => {
    dispatch(bookmarksAction());
  }, [dispatch]);

  return (
    <>
      {bookmarks.length > 0 ? (
        <div className='bookmarks'>
          {bookmarks.map((bm) => (
            <div key={bm.id}>
              <BookmarkCard {...bm} />
            </div>
          ))}
        </div>
      ) : (
        <h2 style={{ textAlign: 'center' }}>There is no saved bookmarks</h2>
      )}
    </>
  );
};

export default Bookmarks;
