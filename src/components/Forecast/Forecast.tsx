import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addBookmarkAction, removeBookmarkAction } from '../../actions';
import BookmarksModel from '../../Models/BookmarksModel';
import ForecastModel from '../../Models/ForecastModel';
import { RootState } from '../../store';
import useGeolocation from '../../useGeolocation';
import ForecastCard from '../ForecastCard/ForecastCard';
import './Forecast.css';

const Forecast = () => {
  const dispatch = useDispatch();
  const location = useGeolocation();
  if (location.loaded && location.coordinates !== undefined) {
    localStorage.setItem('alt', location.coordinates.lat);
    localStorage.setItem('lng', location.coordinates.lng);
  }
  const theme = useSelector((state: RootState) => state.theme.theme);
  const detailedForecast = useSelector(
    (state: RootState) => state.detailedForecast.cityDetails
  );
  const bookmarks = useSelector(
    (state: RootState) => state.bookmarks.bookmarks
  );
  const tempUnit = useSelector((state: RootState) => state.tempUnit.unit);

  const [cityTemp, setCityTemp] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [forecastsText, setForecastsText] = useState('');
  const [forecasts, setForecasts] = useState([]);

  const [isBookmarked, setIsBookmarked] = useState(false);
  const checkIfBookmarked = useCallback(
    (key: string) => {
      if (bookmarks.some((bm) => bm.id === key)) {
        setIsBookmarked(true);
      } else {
        setIsBookmarked(false);
      }
    },
    [bookmarks]
  );

  const handleCityChoise = useCallback(async () => {
    setIsBookmarked(false);

    const { data: currentData } = await axios.get(
      `/currentconditions/v1/${detailedForecast.cityId}?apikey=${process.env.REACT_APP_ACCUWEATHER_API}`
    );

    setCurrentText(currentData[0].WeatherText);
    setCityTemp(currentData[0].Temperature.Imperial.Value);

    const { data: forecastsData } = await axios.get(
      `/forecasts/v1/daily/5day/${detailedForecast.cityId}?apikey=${process.env.REACT_APP_ACCUWEATHER_API}`
    );

    setForecastsText(forecastsData.Headline.Text);

    let tempForecasts = [];
    forecastsData.DailyForecasts.forEach((forecast: any) => {
      tempForecasts.push({
        day: forecast.Date.slice(0, 10),
        minTemp: forecast.Temperature.Minimum.Value,
        maxTemp: forecast.Temperature.Maximum.Value,
        weatherDay: forecast.Day.IconPhrase,
        weatherNight: forecast.Night.IconPhrase,
      });
    });

    setForecasts(tempForecasts);
    checkIfBookmarked(detailedForecast.cityId);
  }, [checkIfBookmarked, detailedForecast.cityId]);

  const bookmark = () => {
    const bookmark: BookmarksModel = {
      id: detailedForecast.cityId,
      city: detailedForecast.city,
      temp: cityTemp,
      text: currentText,
    };

    if (isBookmarked === false) {
      dispatch(addBookmarkAction(bookmark));
      setIsBookmarked(true);
    } else {
      dispatch(removeBookmarkAction(bookmark));
      setIsBookmarked(false);
    }
  };

  useEffect(() => {
    if (detailedForecast.cityId) {
      handleCityChoise();
    }
  }, [detailedForecast.cityId, handleCityChoise]);

  return (
    <div className={`city-weather-${theme}`}>
      <h2 className='upper-main'>
        <div className='current-city'>
          {detailedForecast.city}{' '}
          {tempUnit === 'F' ? cityTemp : Math.floor(((cityTemp - 32) * 5) / 9)}
          {tempUnit === 'F' ? ' F' : ' °C'}
          <h3 style={{ width: '100%', textAlign: 'center' }}>{currentText}</h3>
        </div>
        <button type='button' onClick={bookmark}>
          {isBookmarked === false ? (
            <FaRegBookmark size='3rem' color='cornFlowerBlue' />
          ) : (
            <FaBookmark size='3rem' color='cornFlowerBlue' />
          )}
        </button>
      </h2>
      <h3 style={{ width: '100%', textAlign: 'center' }}>{forecastsText}</h3>
      {forecasts.map((forecast: ForecastModel) => (
        <ForecastCard key={forecast.day} forecast={forecast} />
      ))}
    </div>
  );
};

export default Forecast;
