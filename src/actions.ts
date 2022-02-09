export type Action = { type: 'CHANGE_UNIT', payload: string }

export const changeUnitAction = (unit: string): Action => {
    console.log(unit);

    return {
        type: 'CHANGE_UNIT', payload: unit
    }
}
