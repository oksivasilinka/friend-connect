import { ResultCode, UserResponseType } from 'api/profileApi'
import { Action } from 'redux'
import { updateObjectArray } from 'utils/object-helpers'
import { usersAPI } from 'api/usersApi'
import { AxiosResponse } from 'axios'
import { InferActionsType, ThunkType } from 'redux/store'

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
        case 'FOLLOW' :
            return {
                ...state,
                users: updateObjectArray(state.users, action.id, 'id', { followed: false })
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: updateObjectArray(state.users, action.id, 'id', { followed: true })
            }
        case 'SET_USERS':
            return { ...state, users: [...action.users] }
        case 'SET_CURRENT_PAGE':
            return { ...state, currentPage: action.currentPage }
        case 'SET_TOTAL_COUNT':
            return { ...state, totalCount: action.count }
        case 'TOGGLE_IS_FETCHING':
            return { ...state, isFetching: action.isFetching }
        case 'TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.id]
                    : state.followingInProgress.filter(id => id !== action.id)
            }
        default:
            return state || initialState
    }
}

export const usersActions = {
    followAC: (id: number) => ({ type: 'FOLLOW', id }) as const,
    unFollowAC: (id: number) => ({ type: 'UNFOLLOW', id }) as const,
    setUsers: (users: UserResponseType[]) => ({ type: 'SET_USERS', users }) as const,
    setCurrentPage: (currentPage: number) => ({ type: 'SET_CURRENT_PAGE', currentPage }) as const,
    setTotalUsersCount: (totalCount: number) => ({ type: 'SET_TOTAL_COUNT', count: totalCount }) as const,
    toggleIsFetching: (isFetching: boolean) => ({ type: 'TOGGLE_IS_FETCHING', isFetching }) as const,
    toggleIsFollowingProgress: (isFetching: boolean, id: number) => ({
        type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
        isFetching,
        id
    }) as const
}


export const getUsersTC = (currentPage: number, pageSize: number) => async (dispatch: ThunkType) => {
    dispatch(usersActions.toggleIsFetching(true))
    dispatch(usersActions.setCurrentPage(currentPage))
    const usersData = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(usersActions.toggleIsFetching(false))
    dispatch(usersActions.setUsers(usersData.items))
    dispatch(usersActions.setTotalUsersCount(usersData.totalCount))
}

export const follow = (id: number) => async (dispatch: ThunkType) => {
    await followUnfollowFlow(dispatch, id, usersAPI.unFollowUser.bind(usersAPI), usersActions.followAC)
}

export const unFollow = (id: number) => async (dispatch: ThunkType) => {
    await followUnfollowFlow(dispatch, id, usersAPI.followUser.bind(usersAPI), usersActions.unFollowAC)
}

const followUnfollowFlow = async (dispatch: ThunkType, id: number, apiMethod: ApiMethod, actionCreator: ActionCreator) => {
    dispatch(usersActions.toggleIsFollowingProgress(true, id))
    const res = await apiMethod(id)
    if (res.data.resultCode === ResultCode.SUCCESS) {
        dispatch(actionCreator(id))
    }
    dispatch(usersActions.toggleIsFollowingProgress(false, id))
}


export type ActionTypes = InferActionsType<typeof usersActions>
export type InitialStateType = typeof initialState
type ApiMethod = (id: number) => Promise<AxiosResponse>
type ActionCreator = (id: number) => Action