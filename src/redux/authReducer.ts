import { Dispatch } from 'redux'
import { authAPI, ResultCode, ResultCodeForCaptcha, securityAPI } from 'api/api'
import { ThunkType } from './store'
import { stopSubmit } from 'redux-form'

const SET_USER_DATA = 'samurai-network/auth/SET-USER-DATA'
const LOGOUT_USER_DATA = 'samurai-network/auth/LOGOUT-USER-DATA'
const GET_CAPTCHA_URL = 'samurai-network/auth/GET-CAPTCHA-URL'

let initialState = {
    id: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}

export const authReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA :
            return { ...state, ...action.data, isAuth: true }
        case LOGOUT_USER_DATA :
            return { ...state, ...action.data, isAuth: false }
        case GET_CAPTCHA_URL :
            return { ...state, ...action.payload }
        default:
            return state || initialState
    }
}

const setUserData = (data: InitialStateType) => ({ type: SET_USER_DATA, data }) as const
const logOutUser = (data: InitialStateType) => ({ type: LOGOUT_USER_DATA, data }) as const
const getCaptchaUrlSuccess = (captchaUrl: string | null) => ({
    type: GET_CAPTCHA_URL,
    payload: { captchaUrl }
}) as const

export const getAuthMe = () => async (dispatch: Dispatch) => {
    const meData = await authAPI.me()
    if (meData.resultCode === ResultCode.SUCCESS) {
        const { id, login, email } = meData.data
        dispatch(setUserData({ id, email, login, isAuth: true, captchaUrl: null }))
    }
}

export const login = (email: string, password: string, rememberMe: boolean = true, captcha: string | null) =>
    async (dispatch: ThunkType) => {
        const loginData = await authAPI.login(email, password, rememberMe, captcha)
        if (loginData.resultCode === ResultCode.SUCCESS) {
            await dispatch(getAuthMe())
        } else if (loginData.resultCode === ResultCodeForCaptcha.CAPTCHA) {
            await dispatch(getCaptchaUrlTC())
        } else if (loginData.resultCode === ResultCode.ERROR) {
            const message = loginData.messages.length > 0 ? loginData.messages[0] : 'Some error'
            dispatch(stopSubmit('login', { _error: message }))
        }
    }


export const getCaptchaUrlTC = () => async (dispatch: ThunkType) => {
    const captchaData = await securityAPI.getCaptchaUrl()
    await dispatch(getAuthMe())
    const captchaUrl = captchaData.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export const logOut = () => async (dispatch: Dispatch) => {
    let logoutData = await authAPI.logout()
    if (logoutData.resultCode === ResultCode.SUCCESS) {
        dispatch(logOutUser({
            id: null,
            login: null,
            email: null,
            isAuth: false,
            captchaUrl: null
        }))
    }
}

export type setUserDataType = ReturnType<typeof setUserData>
export type logOutUserType = ReturnType<typeof logOutUser>
export type GetCaptchaUrlSuccessType = ReturnType<typeof getCaptchaUrlSuccess>
type InitialStateType = typeof initialState
type ActionTypes = setUserDataType | logOutUserType | GetCaptchaUrlSuccessType

