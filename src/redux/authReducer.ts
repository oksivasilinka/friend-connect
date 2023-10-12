import { ResultCode } from 'api/profileApi'
import { BaseThunkType, InferActionsType } from './store'
import { FormAction } from 'redux-form'
import { authAPI, ResultCodeForCaptcha } from 'api/authApi'
import { securityAPI } from 'api/securityApi'
import { appActions } from 'redux/appReducer'
import axios from 'axios'

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

export const getAuthMe = (): ThunkType => async (dispatch) => {
    const meData = await authAPI.me()
    if (meData.resultCode === ResultCode.SUCCESS) {
        const { id, login, email } = meData.data
        dispatch(authActions.setUserData({ id, email, login, isAuth: true, captchaUrl: null }))
    }
}

export const login = (email: string, password: string, rememberMe: boolean = true, captcha: string | null): ThunkType =>
    async (dispatch) => {
        try {
            const data = await authAPI.login(email, password, rememberMe, captcha)
            if (data.resultCode === ResultCode.SUCCESS) {
                await dispatch(getAuthMe())
                dispatch(appActions.setError(null))
            } else if (data.resultCode === ResultCodeForCaptcha.CAPTCHA) {
                await dispatch(getCaptchaUrlTC())
            } else if (data.resultCode === ResultCode.ERROR) {
                if (data.messages.length) {
                    dispatch(appActions.setError(data.messages[0]))
                    console.log(data.messages[0])
                } else {
                    dispatch(appActions.setError('Some error occurred'))
                }
            }
        } catch (e: any) {
            let errorMessage = "Some error occurred";

            if (axios.isAxiosError(e)) {
                errorMessage = e.response?.data?.message || e?.message || errorMessage;
            } else if (e instanceof Error) {
                errorMessage = `Native error: ${e.message}`;
            } else {
                errorMessage = JSON.stringify(e);
            }
            dispatch(appActions.setError(errorMessage));
        }
    }

export const getCaptchaUrlTC = (): ThunkType => async (dispatch) => {
    const captchaData = await securityAPI.getCaptchaUrl()
    await dispatch(getAuthMe())
    let captchaUrl = captchaData.url
    dispatch(authActions.getCaptchaUrlSuccess(captchaUrl))
}

export const logOut = (): ThunkType => async (dispatch) => {
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
type ThunkType = BaseThunkType<ActionTypes | FormAction>

