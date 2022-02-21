import { createStore, combineReducers } from 'redux';
import { bookmarksReducer, detailedForecastReducer, tempUnitReducer, themeReducer } from './reducers';


const allReducers = combineReducers({
    tempUnit: tempUnitReducer,
    bookmarks: bookmarksReducer,
    detailedForecast: detailedForecastReducer,
    theme: themeReducer
});


export const store = createStore(allReducers);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch