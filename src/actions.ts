import BookmarksModel from "./Models/BookmarksModel"
import { ADD_BOOKMARK, CHANGE_UNIT, DETAILED_FORECAST, GET_BOOKMARKS, REMOVE_BOOKMARK } from './Constants'

export type ChangeUnitAction = { type: string, payload: string }

export const changeUnitAction = (unit: string): ChangeUnitAction => {
    return {
        type: CHANGE_UNIT, payload: unit
    }
}

export type BookmarksAction = { type: string, payload: BookmarksModel[] }

export const bookmarksAction = (): BookmarksAction => {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    if (bookmarks === null) {
        bookmarks = [];
        localStorage.setItem("bookmarks", JSON.stringify([]));
    }
    return {
        type: GET_BOOKMARKS, payload: bookmarks
    }
}

export const addBookmarkAction = (bookmark: BookmarksModel): BookmarksAction => {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    if (bookmarks === null) {
        bookmarks = [];
        localStorage.setItem("bookmarks", JSON.stringify([]));
    }
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    return {
        type: ADD_BOOKMARK, payload: bookmarks
    }
}

export const removeBookmarkAction = (bookmark: BookmarksModel): BookmarksAction => {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    const filteredBookmarks = bookmarks.filter((bm: BookmarksModel) => !(bm.id === bookmark.id));
    localStorage.setItem("bookmarks", JSON.stringify(filteredBookmarks));
    return {
        type: REMOVE_BOOKMARK, payload: bookmarks
    }
}

export type DetailedForecastAction = { type: string, payload: { cityId: string, city: string } }

export const detailedForecastAction = (cityId: string, city: string): DetailedForecastAction => {
    return {
        type: DETAILED_FORECAST, payload: { cityId, city }
    }
}