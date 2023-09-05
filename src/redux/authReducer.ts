import {Dispatch} from "redux";
import {usersAPI} from "../api/api";
import {ThunkType} from "./store";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'samurai-network/auth/SET-USER-DATA';
const LOGOUT_USER_DATA = 'samurai-network/auth/LOGOUT_USER_DATA';

export type setUserDataType = ReturnType<typeof setUserData>
export type logOutUserType = ReturnType<typeof logOutUser>
type InitialStateType = typeof initialState
type ActionTypes = setUserDataType | logOutUserType

export type DataType = {
    id: string | null
    login: string | null
    email: string | null
    isAuth: boolean
}

let initialState = {
    id: null as string | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false
}

export const authReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA :
            return {...state, ...action.data, isAuth: true}
        case LOGOUT_USER_DATA :
            return {...state, ...action.data, isAuth: false}
        default:
            return state || initialState
    }
}

const setUserData = (data: DataType) => ({type: SET_USER_DATA, data}) as const
const logOutUser = (data: DataType) => ({type: LOGOUT_USER_DATA, data}) as const

export const getAuthMe = () => async (dispatch: Dispatch) => {
    let res = await usersAPI.getAuthMe()
    if (res.data.resultCode === 0) {
        dispatch(setUserData(res.data.data))
    }
}

export const login = (email: string, password: string, rememberMe: boolean = true) => async (dispatch: ThunkType) => {

    let res = await usersAPI.loginUser(email, password, rememberMe)
            if (res.data.resultCode === 0) {
                await dispatch(getAuthMe())
            } else {
                let message = res.data.messages.length > 0 ? res.data.messages : 'Some error'
                dispatch(stopSubmit('login', {_error: message}))
            }
}

export const logOut = () => async (dispatch: Dispatch) => {
    let res = await usersAPI.logOut()
            if (res.data.resultCode === 0) {
                dispatch(logOutUser({
                    id: null,
                    login: null,
                    email: null,
                    isAuth: false
                }))
            }
}