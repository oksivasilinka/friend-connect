import { AppRootStateType } from 'redux/store'

export const captchaUrlSelector = (state: AppRootStateType) => {
    return state.auth.captchaUrl
}

export const isAuthSelector = (state: AppRootStateType) => {
    return state.auth.isAuth
}

export const errorSelector = (state: AppRootStateType) => {
    return state.app.error
}