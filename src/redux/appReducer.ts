import { getAuthMe } from './authReducer'
import { BaseThunkType, InferActionsType } from './store'

let initialState = {
    initialized: false
}

export const appReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'INITIALIZED_SUCCESS' :
            return { ...state, initialized: true }
        default:
            return state || initialState
    }
}

export const appActions = { initializedSuccess: () => ({ type: 'INITIALIZED_SUCCESS' }) as const }

export const initializeApp = (): ThunkType => async (dispatch) => {
    await dispatch(getAuthMe())
    dispatch(appActions.initializedSuccess())
}

type InitialStateType = typeof initialState
type ActionTypes = InferActionsType<typeof appActions>
type ThunkType = BaseThunkType<ActionTypes>