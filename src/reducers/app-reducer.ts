import { Prettify } from '@/types/utils'

export type AppActions =
    | { type: 'any-action' ; payload: string }

export interface AppState {
    defaultState: string
}

export const defaultAppState: Prettify<AppState> = {
    defaultState: ''
}

/**
 * @param state Estado antiguo del reducer
 * @param action Qué acción quiero realizar con este nuevo estado y, si es necesario, un payload
 * @returns AppState. Nuevo estado de reducer
 */
export const AppReducer = (state: Prettify<AppState>, action: AppActions): AppState => {
    switch (action.type) {
        case 'any-action': return { ...state, defaultState: action.payload }
        default: return state
    }
}
