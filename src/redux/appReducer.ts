import { getAuthMe } from './authReducer'
import { AppThunk, InferActionsType } from './store'

let initialState = {
    initialized: false,
    error: null as string | null
}

export const appReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'INITIALIZED_SUCCESS' :
            return { ...state, initialized: true }
        case 'SET-ERROR' :
            return { ...state, error: action.error }
        default:
            return state || initialState
    }
}

export const appActions = {
    initializedSuccess: () => ({ type: 'INITIALIZED_SUCCESS' }) as const,
    setError: (error: string | null) => ({ type: 'SET-ERROR', error }) as const
}

export const initializeApp = (): AppThunk => async (dispatch) => {
    dispatch(getAuthMe())
    dispatch(appActions.initializedSuccess())
}

type InitialStateType = typeof initialState
type ActionTypes = InferActionsType<typeof appActions>