import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Main.css';
import ForecastCard from '../ForecastCard/ForecastCard';
import ForecastModel from '../../Models/ForecastModel';
import Header from '../Header/Header';

const Main = () => {
  const [forecasts, setForecasts] = useState([]);
  const [text, setText] = useState('');
  const [city, setCity] = useState('');
  const [search, setSearch] = useState('');

  const handleSearch = async (e) => {
    setSearch(e.target.value);
    const { data: cityData } = await axios.get(
      `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_ACCUWEATHER_API}&q=${search}`
    );
    console.log(cityData);

    setCity(cityData[0].LocalizedName);
  };

  const getSearchCityWeather = async (cityKey: Number) => {
    const { data: cityData } = await axios.get(
      `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_ACCUWEATHER_API}&q=tel%20aviv`
    );
    setCity(cityData[0].LocalizedName);

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

  useEffect(() => {
    getSearchCityWeather(215854);
  }, []);

  return (
    <div className='main-page'>
      <Header />
      <div className='search'>
        <input
          type='text'
          placeholder='Search'
          value={search}
          onChange={handleSearch}
        />
      </div>
      <h2>{city}</h2>
      <h3>{text}</h3>
      <div className='city-weather'>
        <h4 style={{ width: '100%' }}>Five day forecast:</h4>
        {forecasts.map((forecast: ForecastModel) => (
          <ForecastCard key={forecast.day} forecast={forecast} />
        ))}
      </div>
    </div>
  );
};

export default Main;
