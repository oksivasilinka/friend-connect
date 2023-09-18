import {AppRootStateType} from "./store";
import {createSelector} from "reselect";
import {UserResponseType} from "api/api";

const getUsersSelector = (state: AppRootStateType) => {
    return state.usersPage.users
}
export const getUsers = createSelector(getUsersSelector, (users: UserResponseType[]) => {
    return users.filter(u => true)
})
export const getPageSize = (state: AppRootStateType) => {
    return state.usersPage.pageSize
}
export const getTotalUsersCount = (state: AppRootStateType) => {
    return state.usersPage.totalCount
}
export const getCurrentPage = (state: AppRootStateType) => {
    return state.usersPage.currentPage
}
export const getIsFetching = (state: AppRootStateType) => {
    return state.usersPage.isFetching
}
export const getFollowingInProgress = (state: AppRootStateType) => {
    return state.usersPage.followingInProgress
}


