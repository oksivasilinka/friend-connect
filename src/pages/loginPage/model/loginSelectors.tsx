import { AppRootStateType } from 'redux/store'

export const captchaUrlSelector = (state: AppRootStateType) => state.auth.captchaUrl

export const isAuthSelector = (state: AppRootStateType) => state.auth.isAuth

export const loginSelector = (state: AppRootStateType) => state.auth.login

export const errorSelector = (state: AppRootStateType) => state.app.error

export const avatarSelector = (state: AppRootStateType) => state.auth.avatar

export const authorizedUserIdSelector = (state: AppRootStateType) => state.auth.id