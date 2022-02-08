import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Main.css';
import ForecastCard from '../ForecastCard/ForecastCard';
import ForecastModel from '../../Models/ForecastModel';
import Header from '../Header/Header';

const Main = () => {
  const [forecasts, setForecasts] = useState([]);
  const getSearchCityWeather = async (cityKey: Number) => {
    const { data } = await axios.get(
      `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${process.env.REACT_APP_ACCUWEATHER_API}`
    );
    console.log(data.DailyForecasts);

    let tempForecasts = [];
    data.DailyForecasts.forEach((forecast: any) => {
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
      <div className='search'></div>
      <div className='city-weather'>
        {forecasts.map((forecast: ForecastModel) => (
          <ForecastCard key={forecast.day} forecast={forecast} />
        ))}
      </div>
    </div>
  );
};

export default Main;
