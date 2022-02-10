export type Action = { type: 'CHANGE_UNIT', payload: string }

export const changeUnitAction = (unit: string): Action => {
    return {
        type: 'CHANGE_UNIT', payload: unit
    }
}
