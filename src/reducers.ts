import { BookmarksAction, ChangeUnitAction } from './actions'
import BookmarksModel from './Models/BookmarksModel'
export interface TempUnitState {
    unit: string
}


export const tempUnitReducer = (state: TempUnitState = { unit: 'C' }, action: ChangeUnitAction) => {
    switch (action.type) {
        case 'CHANGE_UNIT':
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
        case 'GET_BOOKMARKS':
            return { ...state, bookmarks: action.payload }
        case 'ADD_BOOKMARK':
            return { ...state, bookmarks: action.payload }
        case 'REMOVE_BOOKMARK':
            return { ...state, bookmarks: action.payload }
        default:
            return state
    }
}