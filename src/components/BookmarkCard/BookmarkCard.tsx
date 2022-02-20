import React from 'react';
import './BookmarkCard.css';
import BookmarksModel from '../../Models/BookmarksModel';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { FaBookmark } from 'react-icons/fa';
import { BiDetail } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import {
  bookmarksAction,
  detailedForecastAction,
  removeBookmarkAction,
} from '../../actions';

const BookmarkCard = (bookmark: BookmarksModel) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tempUnit = useSelector((state: RootState) => state.tempUnit.unit);
  const bookmarkName = bookmark.city.replace(' ', '').split(',');

  const removeFromBookmarks = () => {
    dispatch(removeBookmarkAction(bookmark));
    dispatch(bookmarksAction());
  };

  const openDetailedForecast = () => {
    dispatch(detailedForecastAction(bookmark.id, bookmark.city));

    navigate('/');
  };

  return (
    <div className='bookmark-card'>
      <div className='city-name'>
        <h3>{bookmarkName[0]}</h3>
        <h5>{bookmarkName[1]}</h5>
      </div>
      {tempUnit === 'F'
        ? bookmark.temp
        : Math.floor(((bookmark.temp - 32) * 5) / 9)}
      {tempUnit === 'F' ? ' F' : ' °C'}
      <p>{bookmark.text}</p>
      <div className='button'>
        <button type='button' onClick={removeFromBookmarks}>
          <FaBookmark size='2.5rem' color='cornFlowerBlue' />
        </button>
        <button type='button' onClick={openDetailedForecast}>
          <BiDetail size='2.5rem' color='cornFlowerBlue' />
        </button>
      </div>
    </div>
  );
};

export default BookmarkCard;
