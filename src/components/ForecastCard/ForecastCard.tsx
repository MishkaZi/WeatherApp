import React from 'react';
import './ForecastCard.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const ForecastCard = ({ forecast }) => {
  const tempUnit = useSelector((state: RootState) => state.tempUnit.unit);
  const weekday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const d = new Date(Date.parse(forecast.day));
  const day = weekday[d.getDay()];

  return (
    <div className='forecast-card'>
      <h3> {day} </h3>
      <p>
        {tempUnit === 'F'
          ? forecast.minTemp
          : Math.floor(((forecast.minTemp - 32) * 5) / 9)}
        {tempUnit === 'F' ? ' F' : ' C'} -{' '}
        {tempUnit === 'F'
          ? forecast.maxTemp
          : Math.ceil(((forecast.maxTemp - 32) * 5) / 9)}
        {tempUnit === 'F' ? ' F' : ' C'}
      </p>
      <p>Night: {forecast.weatherNight}</p>
      <p>Day: {forecast.weatherDay}</p>
    </div>
  );
};

export default ForecastCard;
