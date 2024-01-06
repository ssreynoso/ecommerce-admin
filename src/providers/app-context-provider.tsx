import { PropsWithChildren, useReducer } from 'react'
import { AppReducer, defaultAppState } from '@/reducers/app-reducer'
import { AppContext } from '@/contexts/app-context'

type AppContextProviderProps = PropsWithChildren

/**
 * @param props contiene a children 
 * @purpose Este componente se encarga de inicializar el estado global de la App
 * con un valor por defecto y proveer a todos los hijos con la capacidad de obtener
 * este estado compuesto y poder modificarlo mediante acciones contenidas en AppDispatch
 */
export const AppContextProvider = function ({ children }: AppContextProviderProps) {
    const [ AppState, AppDispatch ] = useReducer(AppReducer, defaultAppState)

    return (
        <AppContext.Provider value={{ AppState, AppDispatch }}>
            {children}
        </AppContext.Provider>
    )
}
