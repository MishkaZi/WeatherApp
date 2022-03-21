import { BookmarksAction, ChangeUnitAction, DetailedForecastAction, ErrorAction, ThemeAction } from './actions'
import { ADD_BOOKMARK, CHANGE_UNIT, DETAILED_FORECAST, ERROR, GET_BOOKMARKS, REMOVE_BOOKMARK, THEME } from './Constants'
import BookmarksModel from './Models/BookmarksModel'

export interface TempUnitState {
    unit: string
}
export const tempUnitReducer = (state: TempUnitState = { unit: 'C' }, action: ChangeUnitAction) => {
    switch (action.type) {
        case CHANGE_UNIT:
            return { ...state, unit: action.payload }

        default:
            return state
    }
}

export interface BookmarksState {
    bookmarks: BookmarksModel[]
}
export const bookmarksReducer = (state: BookmarksState = { bookmarks: [] }, action: BookmarksAction) => {
    switch (action.type) {
        case GET_BOOKMARKS:
            return { ...state, bookmarks: action.payload }
        case ADD_BOOKMARK:
            return { ...state, bookmarks: action.payload }
        case REMOVE_BOOKMARK:
            return { ...state, bookmarks: action.payload }
        default:
            return state
    }
}

export interface DetailedForecastState {
    cityDetails: { cityId: string, city: string },
}
export const detailedForecastReducer = (state: DetailedForecastState = { cityDetails: { cityId: '', city: '' } }, action: DetailedForecastAction) => {
    switch (action.type) {
        case DETAILED_FORECAST:
            return { ...state, cityDetails: action.payload }

        default:
            return state
    }
}

export interface ThemeState {
    theme: string
}
export const themeReducer = (state: ThemeState = { theme: 'light' }, action: ThemeAction) => {
    switch (action.type) {
        case THEME:
            return { ...state, theme: action.payload }

        default:
            return state
    }
}

export interface ErrorState {
    error: string
}
export const errorReducer = (state: ErrorState = { error: '' }, action: ErrorAction) => {
    switch (action.type) {
        case ERROR:
            return { ...state, error: action.payload }

        default:
            return state
    }
}