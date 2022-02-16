import React, { SyntheticEvent, useEffect, useState } from 'react';
import axios from 'axios';
import './Main.css';
import ForecastCard from '../ForecastCard/ForecastCard';
import ForecastModel from '../../Models/ForecastModel';
import Header from '../Header/Header';
import { FaRegBookmark } from 'react-icons/fa';
import { FaBookmark } from 'react-icons/fa';
import { addBookmarkAction } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import BookmarksModel from '../../Models/BookmarksModel';
import { RootState } from '../../store';
import useGeolocation from '../../useGeolocation';

const Main = () => {
  const dispatch = useDispatch();
  const tempUnit = useSelector((state: RootState) => state.tempUnit.unit);
  const [autocompleteSearch, setAutocompleteSearch] = useState([]);
  const [forecasts, setForecasts] = useState([]);

  const [city, setCity] = useState('215854');
  const [cityName, setCityName] = useState('');
  const [cityTemp, setCityTemp] = useState(0);
  const [text, setText] = useState('');

  const [search, setSearch] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);

  const location = useGeolocation();
  if (location.loaded) {
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

  const handleOnClickSearch = async (cityKey) => {
    setAutocompleteSearch([]);
    setSearch('');

    const { data: currentData } = await axios.get(
      `/currentconditions/v1/${cityKey}?apikey=${process.env.REACT_APP_ACCUWEATHER_API}`
    );

    setText(currentData[0].WeatherText);
    setCityTemp(currentData[0].Temperature.Imperial.Value);

    const { data: forecastsData } = await axios.get(
      `/forecasts/v1/daily/5day/${cityKey}?apikey=${process.env.REACT_APP_ACCUWEATHER_API}`
    );

    setText(forecastsData.Headline.Text);

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
  };

  const bookmark = () => {
    const bookmark: BookmarksModel = {
      key: city,
      city: cityName,
      temp: cityTemp,
      text: text,
    };
    console.log(bookmark);

    if (isBookmarked === false) {
      dispatch(addBookmarkAction(bookmark));
      setIsBookmarked(true);
    } else {
      setIsBookmarked(false);
    }
  };

  const getLocationByGeo = async () => {
    setCityName('Tel Aviv');
    handleOnClickSearch('215854');

    if (localStorage.getItem('lng')) {
      const { data } = await axios.get(
        `/locations/v1/cities/geoposition/search?apikey=${
          process.env.REACT_APP_ACCUWEATHER_API
        }&q=${localStorage.getItem('alt')},${localStorage.getItem('lng')}`
      );
      setCityName(data.LocalizedName);
      handleOnClickSearch(data.Key);
    }
  };

  useEffect(() => {
    getLocationByGeo();
  }, []);

  return (
    <>
      <Header />
      <div className='main-page'>
        <div className='search'>
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
                    handleOnClickSearch(e.target.value);
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
        {/* {location.loaded
          ? JSON.stringify(location)
          : 'Location not available yet!'} */}

        <div className='city-weather'>
          <h2 className='upper-main'>
            <div className='current-city'>
              {cityName}{' '}
              {tempUnit === 'F'
                ? cityTemp
                : Math.floor(((cityTemp - 32) * 5) / 9)}
              {tempUnit === 'F' ? ' F' : ' °C'}
            </div>
            <button type='button' onClick={bookmark}>
              {isBookmarked === false ? (
                <FaRegBookmark size='3rem' color='cornFlowerBlue' />
              ) : (
                <FaBookmark size='3rem' color='cornFlowerBlue' />
              )}
            </button>
          </h2>
          <h3 style={{ width: '100%', textAlign: 'center' }}>{text}</h3>
          {forecasts.map((forecast: ForecastModel) => (
            <ForecastCard key={forecast.day} forecast={forecast} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Main;
