import axios from 'axios';
import React, { SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { detailedForecastAction } from '../../actions';
import './Search.css';

const Search = () => {
  const dispatch = useDispatch();

  const theme = useSelector((state: RootState) => state.theme.theme);
  const [search, setSearch] = useState('');
  const [autocompleteSearch, setAutocompleteSearch] = useState([]);

  const handleOnChangeSearch = async (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;

    setSearch(target.value);

    const { data: autocompleteData } = await axios.get(
      `/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_ACCUWEATHER_API}&q=${target.value}`
    );

    setAutocompleteSearch(autocompleteData);
  };

  return (
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
                dispatch(
                  detailedForecastAction(e.target.value, e.target.innerHTML)
                );
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
  );
};

export default Search;
