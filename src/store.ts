import { createStore, combineReducers } from 'redux';
import { tempUnitReducer } from './reducers';


const allReducers = combineReducers({
    tempUnit: tempUnitReducer
});


export const store = createStore(allReducers);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch