import { createStore, combineReducers } from 'redux';
import { bookmarksReducer, detailedForecastReducer, tempUnitReducer } from './reducers';


const allReducers = combineReducers({
    tempUnit: tempUnitReducer,
    bookmarks: bookmarksReducer,
    detailedForecast: detailedForecastReducer
});


export const store = createStore(allReducers);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch