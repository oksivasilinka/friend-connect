import {Dispatch} from "redux";
import {SecurityAPI, usersAPI} from "api/api";
import {ThunkType} from "./store";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'samurai-network/auth/SET-USER-DATA';
const LOGOUT_USER_DATA = 'samurai-network/auth/LOGOUT-USER-DATA';
const GET_CAPTCHA_URL = 'samurai-network/auth/GET-CAPTCHA-URL';

export type setUserDataType = ReturnType<typeof setUserData>
export type logOutUserType = ReturnType<typeof logOutUser>
export type GetCaptchaUrlSuccessType = ReturnType<typeof getCaptchaUrlSuccess>
type InitialStateType = typeof initialState
type ActionTypes = setUserDataType | logOutUserType | GetCaptchaUrlSuccessType

export type DataType = {
    id: string | null
    login: string | null
    email: string | null
    isAuth: boolean
    captchaUrl: string | null
}

let initialState = {
    id: null as string | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}

export const authReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA :
            return {...state, ...action.data, isAuth: true}
        case LOGOUT_USER_DATA :
            return {...state, ...action.data, isAuth: false}
        case GET_CAPTCHA_URL :
            return {...state, ...action.payload}
        default:
            return state || initialState
    }
}

const setUserData = (data: DataType) => ({type: SET_USER_DATA, data}) as const
const logOutUser = (data: DataType) => ({type: LOGOUT_USER_DATA, data}) as const
const getCaptchaUrlSuccess = (captchaUrl: string | null) => ({type: GET_CAPTCHA_URL, payload: {captchaUrl}}) as const

export const getAuthMe = () => async (dispatch: Dispatch) => {
    let res = await usersAPI.getAuthMe()
    if (res.data.resultCode === 0) {
        dispatch(setUserData(res.data.data))
    }
}

export const login = (email: string, password: string, rememberMe: boolean = true, captcha: string | null) => async (dispatch: ThunkType) => {
    let res = await usersAPI.loginUser(email, password, rememberMe, captcha)
    if (res.data.resultCode === 0) {
        await dispatch(getAuthMe())
    } else if (res.data.resultCode === 10) {
        await dispatch(getCaptchaUrlTC())
    } else {
        let message = res.data.messages.length > 0 ? res.data.messages : 'Some error'
        dispatch(stopSubmit('login', {_error: message}))
    }
}


export const getCaptchaUrlTC = () => async (dispatch: ThunkType) => {
    const res = await SecurityAPI.getCaptchaUrl()
    await dispatch(getAuthMe())
    const captchaUrl = res.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export const logOut = () => async (dispatch: Dispatch) => {
    let res = await usersAPI.logOut()
    if (res.data.resultCode === 0) {
        dispatch(logOutUser({
            id: null,
            login: null,
            email: null,
            isAuth: false,
            captchaUrl: null
        }))
    }
}