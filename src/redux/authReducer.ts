import { ResultCode } from 'api/profileApi'
import { InferActionsType, ThunkType } from './store'
import { stopSubmit } from 'redux-form'
import { authAPI, ResultCodeForCaptcha } from 'api/authApi'
import { securityAPI } from 'api/securityApi'


let initialState = {
    id: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}

export const authReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'SET_USER_DATA' :
            return { ...state, ...action.data, isAuth: true }
        case 'LOGOUT_USER_DATA' :
            return { ...state, ...action.data, isAuth: false }
        case 'GET_CAPTCHA_URL' :
            return { ...state, ...action.payload }
        default:
            return state || initialState
    }
}


export const authActions = {
    setUserData: (data: InitialStateType) => ({ type: 'SET_USER_DATA', data }) as const,
    logOutUser: (data: InitialStateType) => ({ type: 'LOGOUT_USER_DATA', data }) as const,
    getCaptchaUrlSuccess: (captchaUrl: string | null) => ({
        type: 'GET_CAPTCHA_URL', payload: { captchaUrl }
    }) as const
}

export const getAuthMe = () => async (dispatch: ThunkType) => {
    const meData = await authAPI.me()
    if (meData.resultCode === ResultCode.SUCCESS) {
        const { id, login, email } = meData.data
        dispatch(authActions.setUserData({ id, email, login, isAuth: true, captchaUrl: null }))
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
    dispatch(authActions.getCaptchaUrlSuccess(captchaUrl))
}

export const logOut = () => async (dispatch: ThunkType) => {
    let logoutData = await authAPI.logout()
    if (logoutData.resultCode === ResultCode.SUCCESS) {
        dispatch(authActions.logOutUser({
            id: null,
            login: null,
            email: null,
            isAuth: false,
            captchaUrl: null
        }))
    }
}


type InitialStateType = typeof initialState
export type ActionTypes = InferActionsType<typeof authActions>

