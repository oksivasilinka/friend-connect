import { getAuthMe } from './authReducer'
import { InferActionsType, ThunkType } from './store'


type ActionTypes = InferActionsType<typeof appActions>
type InitialStateType = typeof initialState

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


export const initializeApp = () => async (dispatch: ThunkType) => {
    await dispatch(getAuthMe())
    dispatch(appActions.initializedSuccess())
}

