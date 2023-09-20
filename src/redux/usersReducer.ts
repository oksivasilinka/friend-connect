import {ResultCode, UserResponseType, usersAPI} from "api/api";
import {Dispatch} from "redux";
import {updateObjectArray} from "utils/object-helpers";

const FOLLOW = "FOLLOW";
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_COUNT = 'SET-TOTAL-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS';


export let initialState = {
    users: [] as UserResponseType[],
    pageSize: 10,
    totalCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as number[]
}

export const usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW :
            return {
                ...state,
                users: updateObjectArray(state.users, action.id, 'id', {followed: false})
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectArray(state.users, action.id, 'id', {followed: true})
            }
        case SET_USERS:
            return {...state, users: [...action.users]}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_TOTAL_COUNT:
            return {...state, totalCount: action.count}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.id]
                    : state.followingInProgress.filter(id => id !== action.id)
            }
        default:
            return state || initialState
    }
}

export const followAC = (id: number) => ({type: FOLLOW, id}) as const
export const unFollowAC = (id: number) => ({type: UNFOLLOW, id}) as const
export const setUsers = (users: UserResponseType[]) => ({type: SET_USERS, users}) as const
export const setCurrentPage = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage}) as const
export const setTotalUsersCount = (totalCount: number) => ({type: SET_TOTAL_COUNT, count: totalCount}) as const
export const toggleIsFetching = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching}) as const
export const toggleIsFollowingProgress = (isFetching: boolean, id: number) =>
    ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, id}) as const

export const getUsersTC = (currentPage: number, pageSize: number) => async (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true))
    dispatch(setCurrentPage(currentPage))
    const usersData = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(usersData.items))
    dispatch(setTotalUsersCount(usersData.totalCount))
}

export const follow = (id: number) => async (dispatch: Dispatch) => {
    await followUnfollowFlow(dispatch, id, usersAPI.unFollowUser.bind(usersAPI), followAC)
}

export const unFollow = (id: number) => async (dispatch: Dispatch) => {
    await followUnfollowFlow(dispatch, id, usersAPI.followUser.bind(usersAPI), unFollowAC)
}

const followUnfollowFlow = async (dispatch: Dispatch, id: number, apiMethod: any, actionCreator: any) => {
    dispatch(toggleIsFollowingProgress(true, id))
    const res = await apiMethod(id)
    if (res.data.resultCode === ResultCode.SUCCESS) {
        dispatch(actionCreator(id))
    }
    dispatch(toggleIsFollowingProgress(false, id))
}



export type followType = ReturnType<typeof followAC>
export type unFollowType = ReturnType<typeof unFollowAC>
export type setUsersType = ReturnType<typeof setUsers>
export type setCurrentPageType = ReturnType<typeof setCurrentPage>
export type setTotalUsersCountType = ReturnType<typeof setTotalUsersCount>
export type toggleIsFetchingType = ReturnType<typeof toggleIsFetching>
export type toggleIsFollowingProgressType = ReturnType<typeof toggleIsFollowingProgress>

export type InitialStateType = typeof initialState

export type ActionTypes =
    followType
    | unFollowType
    | setUsersType
    | setCurrentPageType
    | setTotalUsersCountType
    | toggleIsFetchingType
    | toggleIsFollowingProgressType