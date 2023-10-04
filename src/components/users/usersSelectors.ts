import {AppRootStateType} from "redux/store";
import {createSelector} from "reselect";
import { UserResponseType } from 'api/usersApi'

export const usersSelector = (state: AppRootStateType) => {
    return state.usersPage.users
}
export const getUsers = createSelector(usersSelector, (users: UserResponseType[]) => {
    return users.filter(_ => true)
})
export const pageSizeSelector = (state: AppRootStateType) => {
    return state.usersPage.pageSize
}
export const totalUsersCount = (state: AppRootStateType) => {
    return state.usersPage.totalCount
}
export const currentPageSelector = (state: AppRootStateType) => {
    return state.usersPage.currentPage
}
export const getIsFetching = (state: AppRootStateType) => {
    return state.usersPage.isFetching
}
export const getFollowingInProgress = (state: AppRootStateType) => {
    return state.usersPage.followingInProgress
}

export const usersFilterSelector = (state: AppRootStateType) => {
    return state.usersPage.filter
}


