import React, { useCallback, useEffect } from 'react';
import Router from './Router';
import { useDispatch, useSelector } from 'react-redux';
import {
  bookmarksAction,
  changeUnitAction,
  detailedForecastAction,
  themeAction,
} from './actions';
import './App.css';
import { RootState } from './store';
import axios from 'axios';

const App = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const detailedForecast = useSelector(
    (state: RootState) => state.detailedForecast.cityDetails
  );

  const getLocationByGeo = useCallback(async () => {
    dispatch(detailedForecastAction('215854', 'Tel Aviv, Israel'));

    if (localStorage.getItem('lng')) {
      const { data } = await axios.get(
        `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${
          process.env.REACT_APP_ACCUWEATHER_API
        }&q=${localStorage.getItem('alt')},${localStorage.getItem('lng')}`
      );
      dispatch(
        detailedForecastAction(
          data.Key,
          `${data.LocalizedName}, ${data.Country.LocalizedName}`
        )
      );
    }
  }, [dispatch]);

  useEffect(() => {
    if (!detailedForecast.cityId) {
      getLocationByGeo();
    } else {
      detailedForecastAction(detailedForecast.cityId, detailedForecast.city);
    }
    if (localStorage.getItem('tempUnit') !== undefined) {
      dispatch(changeUnitAction(localStorage.getItem('tempUnit')));
    }
    if (localStorage.getItem('theme') !== undefined) {
      dispatch(themeAction(localStorage.getItem('theme')));
    }
    dispatch(bookmarksAction());
  }, [
    detailedForecast.city,
    detailedForecast.cityId,
    dispatch,
    getLocationByGeo,
  ]);

  return (
    <div className={`body-${theme}`}>
      <Router />
    </div>
  );
};

export default App;
