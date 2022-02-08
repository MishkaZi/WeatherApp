import React from 'react';
import './ForecastCard.css';

const ForecastCard = ({ forecast }) => {
  return (
    <div className='forecast-card'>
      <h5> {forecast.day} </h5>
      <p>Min temp: {forecast.minTemp}</p>
      <p>Max temp: {forecast.maxTemp}</p>
      <p>Night: {forecast.weatherNight}</p>
      <p>Day: {forecast.weatherDay}</p>
    </div>
  );
};

export default ForecastCard;
