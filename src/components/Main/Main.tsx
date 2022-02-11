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
      `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_ACCUWEATHER_API}&q=${search}`
    );
    setAutocompleteSearch(autocompleteData);
  };

  const handleOnClickSearch = async (e) => {
    var index = e.nativeEvent.target.selectedIndex;
    const cityName = e.nativeEvent.target[index].text;

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

  const getSearchCityWeather = async (cityKey: Number) => {
    // const { data: currentData } = await axios.get(
    //   `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${process.env.REACT_APP_ACCUWEATHER_API}`
    // );
    // console.log(currentData);
    // setCityTemp(currentData.Temperature);
    // const { data: cityData } = await axios.get(
    //   `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_ACCUWEATHER_API}&q=tel%20aviv`
    // );
    // console.log(cityData);
    // setCity(cityData[0].LocalizedName);
    // const { data: forecastsData } = await axios.get(
    //   `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${process.env.REACT_APP_ACCUWEATHER_API}`
    // );
    // setText(forecastsData.Headline.Text);
    // let tempForecasts = [];
    // forecastsData.DailyForecasts.forEach((forecast: any) => {
    //   tempForecasts.push({
    //     day: forecast.Date.slice(0, 10),
    //     minTemp: forecast.Temperature.Minimum.Value,
    //     maxTemp: forecast.Temperature.Maximum.Value,
    //     weatherDay: forecast.Day.IconPhrase,
    //     weatherNight: forecast.Night.IconPhrase,
    //   });
    // });
    // setForecasts(tempForecasts);
  };

  useEffect(() => {
    // getSearchCityWeather(215854);
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
          <select onChange={handleOnClickSearch}>
            {autocompleteSearch.length !== 0 &&
              autocompleteSearch?.map((city: any) => (
                <option key={city.Key} value={city.Key}>
                  {`${city.LocalizedName}, ${city.Country.LocalizedName}`}
                </option>
              ))}
          </select>
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
