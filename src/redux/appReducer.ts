import {getAuthMe} from "./authReducer";
import {ThunkType} from "./store";

const INITIALIZED_SUCCESS = 'INITIALIZED-SUCCESS';

type ActionTypes = ReturnType<typeof initializedSuccess>
type InitialStateType = typeof initialState

let initialState = {
    initialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS :
            return {...state, initialized: true}
        default:
            return state || initialState
    }
}

const initializedSuccess = () => ({type: INITIALIZED_SUCCESS}) as const


export const initializeApp = () => async (dispatch: ThunkType) => {
    await dispatch(getAuthMe());
    dispatch(initializedSuccess());
}

