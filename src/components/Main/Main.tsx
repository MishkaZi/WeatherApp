import React, { SyntheticEvent, useEffect, useState } from 'react';
import axios from 'axios';
import './Main.css';
import ForecastCard from '../ForecastCard/ForecastCard';
import ForecastModel from '../../Models/ForecastModel';
import Header from '../Header/Header';
import { FaRegBookmark } from 'react-icons/fa';
import { FaBookmark } from 'react-icons/fa';
import { addBookmarkAction } from '../../actions';
import { useDispatch } from 'react-redux';
import BookmarksModel from '../../Models/BookmarksModel';

const Main = () => {
  const dispatch = useDispatch();
  const [autocompleteSearch, setAutocompleteSearch] = useState([]);
  const [forecasts, setForecasts] = useState([]);

  const [city, setCity] = useState('215854');
  const [cityName, setCityName] = useState('');
  const [cityTemp, setCityTemp] = useState();
  const [text, setText] = useState('');

  const [search, setSearch] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleOnChangeSearch = async (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;

    setSearch(target.value);

    const { data: autocompleteData } = await axios.get(
      `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_ACCUWEATHER_API}&q=${target.value}`
    );
    setAutocompleteSearch(autocompleteData);
  };

  const handleOnClickSearch = async (e) => {
    setAutocompleteSearch([]);
    setSearch('');
    const cityName = e.target.innerHTML;

    const cityKey = e.target.value;
    setCity(cityKey);
    setCityName(cityName);
    const { data: currentData } = await axios.get(
      `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${process.env.REACT_APP_ACCUWEATHER_API}`
    );

    setText(currentData[0].WeatherText);
    setCityTemp(currentData[0].Temperature.Imperial.Value);

    const { data: forecastsData } = await axios.get(
      `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${process.env.REACT_APP_ACCUWEATHER_API}`
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

  useEffect(() => {
    //your location fetch
  }, []);

  return (
    <>
      <Header />
      <div className='main-page'>
        <div className='search'>
          <input
            type='text'
            placeholder='Search'
            value={search}
            onChange={(e) => {
              handleOnChangeSearch(e);
            }}
          />
          <div className='dropdown'>
            {autocompleteSearch.length !== 0 &&
              autocompleteSearch?.map((city: any) => (
                <button
                  onClick={handleOnClickSearch}
                  className='dropdown-item'
                  key={city.Key}
                  value={city.Key}
                >
                  {`${city.LocalizedName}, ${city.Country.LocalizedName}`}
                </button>
              ))}
          </div>
        </div>

        <div className='city-weather'>
          <h2 className='upper-main'>
            <div className='current-city'>{cityName}</div>
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
