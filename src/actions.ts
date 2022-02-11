import BookmarksModel from "./Models/BookmarksModel"

export type ChangeUnitAction = { type: 'CHANGE_UNIT', payload: string }

export const changeUnitAction = (unit: string): ChangeUnitAction => {
    return {
        type: 'CHANGE_UNIT', payload: unit
    }
}

export type BookmarksAction = { type: string, payload: BookmarksModel[] | BookmarksModel }

export const bookmarksAction = (bookmarks: BookmarksModel[]): BookmarksAction => {
    return {
        type: 'GET_BOOKMARKS', payload: bookmarks
    }
}

export const addBookmarkAction = (bookmark: BookmarksModel): BookmarksAction => {

    return {
        type: 'ADD_BOOKMARK', payload: bookmark
    }
}

export const removeBookmarkAction = (bookmark: BookmarksModel): BookmarksAction => {
    return {
        type: 'REMOVE_BOOKMARK', payload: bookmark
    }
}