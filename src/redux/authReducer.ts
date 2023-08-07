const SET_USER_DATA = 'SET-USER-DATA';

export type setUserDataType = ReturnType<typeof setUserData>

export type InitialStateType = typeof initialState

export type ActionTypes = setUserDataType

export type DataType = {
    id: any
    login: any
    email: any
    isAuth: boolean
}

export let initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false
}

export const authReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA :
            return {...state, ...action.data, isAuth: true}

        default:
            return state || initialState
    }
}

export const setUserData = (data: DataType) => ({type: SET_USER_DATA, data }) as const
