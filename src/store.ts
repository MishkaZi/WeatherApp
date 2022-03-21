import { createStore, combineReducers } from 'redux';
import { bookmarksReducer, detailedForecastReducer, errorReducer, tempUnitReducer, themeReducer } from './reducers';


const allReducers = combineReducers({
    tempUnit: tempUnitReducer,
    bookmarks: bookmarksReducer,
    detailedForecast: detailedForecastReducer,
    theme: themeReducer,
    error: errorReducer
});


export const store = createStore(allReducers);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch