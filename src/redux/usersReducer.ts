import {usersAPI} from "../api/api";
import {Dispatch} from "redux";

const FOLLOW = "FOLLOW";
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_COUNT = 'SET-TOTAL-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS';

type LocationUsersType = {
    city: string
    country: string
}
export type UsersType = {
    id: number
    photos: {
        small: string | null
        large: string | null
    }
    followed: boolean
    name: string
    status: string
    location: LocationUsersType
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

export let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 10,
    totalCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as number[]
}

export const usersReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW :
            return {...state, users: state.users.map(u => u.id === action.id ? {...u, followed: false} : u)}
        case UNFOLLOW:
            return {...state, users: state.users.map(u => u.id === action.id ? {...u, followed: true} : u)}
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
export const setUsers = (users: UsersType[]) => ({type: SET_USERS, users}) as const
export const setCurrentPage = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage}) as const
export const setTotalUsersCount = (totalCount: number) => ({type: SET_TOTAL_COUNT, count: totalCount}) as const
export const toggleIsFetching = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching}) as const
export const toggleIsFollowingProgress = (isFetching: boolean, id: number) =>
    ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, id}) as const

export const getUsers = (currentPage: number, pageSize: number) => (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true))
    usersAPI.getUsers(currentPage, pageSize)
        .then(res => {
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(res.data.items))
        dispatch(setTotalUsersCount(res.data.totalCount))
    })
}

export const follow = (id: number) => (dispatch: Dispatch) => {
    dispatch(toggleIsFollowingProgress(true, id))
    usersAPI.unFollowUser(id)
        .then(res => {
        if (res.data.resultCode === 0) {
            dispatch(followAC(id))
        }
        dispatch(toggleIsFollowingProgress(false, id))
    })
}

export const unFollow = (id: number) => (dispatch: Dispatch) => {
    dispatch(toggleIsFollowingProgress(true, id))
    usersAPI.followUser(id)
        .then(res => {
        if (res.data.resultCode === 0) {
            dispatch(unFollowAC(id))
        }
        dispatch(toggleIsFollowingProgress(false, id))
    })
}