import { Action } from './actions'
export interface TempUnitState {
    unit: string
}


export const tempUnitReducer = (state: TempUnitState = { unit: 'C' }, action: Action) => {
    switch (action.type) {
        case 'CHANGE_UNIT':
            return { ...state, unit: action.payload }

        default:
            return state
    }
}