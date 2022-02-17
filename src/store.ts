import { createStore, combineReducers } from 'redux';
import { bookmarksReducer, tempUnitReducer } from './reducers';


const allReducers = combineReducers({
    tempUnit: tempUnitReducer,
    bookmarks: bookmarksReducer
});


export const store = createStore(allReducers);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch