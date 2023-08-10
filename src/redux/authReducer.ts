import {Dispatch} from "redux";
import {usersAPI} from "../api/api";

const SET_USER_DATA = 'SET-USER-DATA';

type setUserDataType = ReturnType<typeof setUserData>
type InitialStateType = typeof initialState
type ActionTypes = setUserDataType

export type DataType = {
    id: any
    login: any
    email: any
    isAuth: boolean
}

let initialState = {
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

const setUserData = (data: DataType) => ({type: SET_USER_DATA, data }) as const

export const getAuthMe = () => (dispatch: Dispatch) => {
    usersAPI.getAuthMe().then((data) => {
        if (data.resultCode === 0) {
            dispatch(setUserData(data.data))
        }
    });
}
