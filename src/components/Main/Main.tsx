import React, { SyntheticEvent, useEffect, useState } from 'react';
import axios from 'axios';
import './Main.css';
import ForecastCard from '../ForecastCard/ForecastCard';
import ForecastModel from '../../Models/ForecastModel';
import { FaRegBookmark } from 'react-icons/fa';
import { FaBookmark } from 'react-icons/fa';
import { addBookmarkAction, removeBookmarkAction } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import BookmarksModel from '../../Models/BookmarksModel';
import { RootState } from '../../store';
import useGeolocation from '../../useGeolocation';

const Main = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const tempUnit = useSelector((state: RootState) => state.tempUnit.unit);
  const detailedForecast = useSelector(
    (state: RootState) => state.detailedForecast.cityDetails
  );
  const bookmarks = useSelector(
    (state: RootState) => state.bookmarks.bookmarks
  );
  const [autocompleteSearch, setAutocompleteSearch] = useState([]);
  const [forecasts, setForecasts] = useState([]);

  const [city, setCity] = useState('');
  const [cityName, setCityName] = useState('');
  const [cityTemp, setCityTemp] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [forecastsText, setForecastsText] = useState('');

  const [search, setSearch] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);

  const location = useGeolocation();

  if (location.loaded && location.coordinates !== undefined) {
    localStorage.setItem('alt', location.coordinates.lat);
    localStorage.setItem('lng', location.coordinates.lng);
  }

  const handleOnChangeSearch = async (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;

    setSearch(target.value);

    const { data: autocompleteData } = await axios.get(
      `/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_ACCUWEATHER_API}&q=${target.value}`
    );

    setAutocompleteSearch(autocompleteData);
  };

  const handleCityChoise = async (cityKey: string) => {
    setAutocompleteSearch([]);
    setSearch('');
    setIsBookmarked(false);
    setCity(cityKey);

    const { data: currentData } = await axios.get(
      `/currentconditions/v1/${cityKey}?apikey=${process.env.REACT_APP_ACCUWEATHER_API}`
    );

    setCurrentText(currentData[0].WeatherText);
    setCityTemp(currentData[0].Temperature.Imperial.Value);

    const { data: forecastsData } = await axios.get(
      `/forecasts/v1/daily/5day/${cityKey}?apikey=${process.env.REACT_APP_ACCUWEATHER_API}`
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
    checkIfBookmarked(cityKey);
  };

  const bookmark = () => {
    const bookmark: BookmarksModel = {
      id: city,
      city: cityName,
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

  const getLocationByGeo = async () => {
    setCityName('Tel Aviv, Israel');
    handleCityChoise('215854');

    if (localStorage.getItem('lng')) {
      const { data } = await axios.get(
        `/locations/v1/cities/geoposition/search?apikey=${
          process.env.REACT_APP_ACCUWEATHER_API
        }&q=${localStorage.getItem('alt')},${localStorage.getItem('lng')}`
      );

      setCityName(`${data.LocalizedName}, ${data.Country.LocalizedName}`);

      handleCityChoise(data.Key);
      checkIfBookmarked(data.Key);
    }
  };

  const checkIfBookmarked = (key: string) => {
    if (bookmarks.some((bm) => bm.id === key)) {
      setIsBookmarked(true);
    } else {
      setIsBookmarked(false);
    }
  };

  useEffect(() => {
    if (!detailedForecast.cityId) {
      getLocationByGeo();
    } else {
      setCityName(detailedForecast.city);
      handleCityChoise(detailedForecast.cityId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className='main-page'>
        <div className={`search-${theme}`}>
          <input
            type='text'
            placeholder='Type city name...'
            value={search}
            onBlur={() => {
              setTimeout(() => {
                setAutocompleteSearch([]);
                setSearch('');
              }, 100);
            }}
            onChange={(e) => {
              handleOnChangeSearch(e);
            }}
          />
          <div className='dropdown'>
            {autocompleteSearch.length !== 0 &&
              autocompleteSearch?.map((city: any) => (
                <button
                  onClick={(e: any) => {
                    setCityName(e.target.innerHTML);
                    handleCityChoise(e.target.value);
                  }}
                  className='dropdown-item'
                  key={city.Key}
                  value={city.Key}
                >
                  {`${city.LocalizedName}, ${city.Country.LocalizedName}`}
                </button>
              ))}
          </div>
        </div>

        <div className={`city-weather-${theme}`}>
          <h2 className='upper-main'>
            <div className='current-city'>
              {cityName}{' '}
              {tempUnit === 'F'
                ? cityTemp
                : Math.floor(((cityTemp - 32) * 5) / 9)}
              {tempUnit === 'F' ? ' F' : ' °C'}
              <h3 style={{ width: '100%', textAlign: 'center' }}>
                {currentText}
              </h3>
            </div>
            <button type='button' onClick={bookmark}>
              {isBookmarked === false ? (
                <FaRegBookmark size='3rem' color='cornFlowerBlue' />
              ) : (
                <FaBookmark size='3rem' color='cornFlowerBlue' />
              )}
            </button>
          </h2>
          <h3 style={{ width: '100%', textAlign: 'center' }}>
            {forecastsText}
          </h3>
          {forecasts.map((forecast: ForecastModel) => (
            <ForecastCard key={forecast.day} forecast={forecast} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Main;
