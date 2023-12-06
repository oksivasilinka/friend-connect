import { AppRootStateType } from 'redux/store'

export const profileSelector = (state: AppRootStateType) => state.profilePage.profile
export const statusSelector = (state: AppRootStateType) => state.profilePage.status
export const authorizedUserIdSelector = (state: AppRootStateType) => state.auth.id
export const loginSelector = (state: AppRootStateType) => state.auth.login