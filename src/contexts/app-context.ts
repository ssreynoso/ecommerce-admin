import { AppActions, AppState, defaultAppState } from '@/reducers/app-reducer'
import { Prettify } from '@/types/utils'
import { createContext, useContext } from 'react'

/**
 * Propiedades que provee el contexto de App.
 */
export interface IAppContextProps {
    AppState   : Prettify<AppState>
    AppDispatch: React.Dispatch<AppActions>
}

export const AppContext = createContext<IAppContextProps>({
    AppState: defaultAppState,
    AppDispatch: () => {},
})

export const useAppContext = () => {
    const context = useContext(AppContext)

    if (context === undefined) {
        throw new Error('useAppContext must be used within a AppContextProvider')
    }

    return context
}