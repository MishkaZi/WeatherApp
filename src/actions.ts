import BookmarksModel from "./Models/BookmarksModel"

export type ChangeUnitAction = { type: 'CHANGE_UNIT', payload: string }

export const changeUnitAction = (unit: string): ChangeUnitAction => {
    return {
        type: 'CHANGE_UNIT', payload: unit
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
        type: 'GET_BOOKMARKS', payload: bookmarks
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
        type: 'ADD_BOOKMARK', payload: bookmarks
    }
}

export const removeBookmarkAction = (bookmark: BookmarksModel): BookmarksAction => {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    const filteredBookmarks = bookmarks.filter((bm: BookmarksModel) => !(bm.key === bookmark.key));
    localStorage.setItem("bookmarks", JSON.stringify(filteredBookmarks));
    return {
        type: 'REMOVE_BOOKMARK', payload: bookmarks
    }
}