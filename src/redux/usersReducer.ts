import { ResultCode } from 'api/profileApi'
import { Action, Dispatch } from 'redux'
import { updateObjectArray } from 'utils/object-helpers'
import { UserResponseType, usersAPI } from 'api/usersApi'
import { AxiosResponse } from 'axios'
import { BaseThunkType, InferActionsType } from 'redux/store'

export let initialState = {
    users: [] as UserResponseType[],
    pageSize: 10,
    totalCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as number[],
    filter: {
        term: '' as string | null,
        friend: null as boolean | null
    }
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
        case 'SET_FILTER':
            return { ...state, filter: action.payload }
        default:
            return state || initialState
    }
}

export const usersActions = {
    followAC: (id: number) => ({ type: 'FOLLOW', id }) as const,
    unFollowAC: (id: number) => ({ type: 'UNFOLLOW', id }) as const,
    setUsers: (users: UserResponseType[]) => ({ type: 'SET_USERS', users }) as const,
    setCurrentPage: (currentPage: number) => ({ type: 'SET_CURRENT_PAGE', currentPage }) as const,
    setFilter: (filter: FilterForm) => ({ type: 'SET_FILTER', payload:  filter  }) as const,
    setTotalUsersCount: (totalCount: number) => ({ type: 'SET_TOTAL_COUNT', count: totalCount }) as const,
    toggleIsFetching: (isFetching: boolean) => ({ type: 'TOGGLE_IS_FETCHING', isFetching }) as const,
    toggleIsFollowingProgress: (isFetching: boolean, id: number) => ({
        type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
        isFetching,
        id
    }) as const
}


export const getUsersTC = (currentPage: number, pageSize: number, filter: FilterForm): ThunkType => async (dispatch) => {
    dispatch(usersActions.toggleIsFetching(true))
    dispatch(usersActions.setCurrentPage(currentPage))
    dispatch(usersActions.setFilter(filter))
    const usersData = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend)
    dispatch(usersActions.toggleIsFetching(false))
    dispatch(usersActions.setUsers(usersData.items))
    dispatch(usersActions.setTotalUsersCount(usersData.totalCount))
}

export const follow = (id: number): ThunkType => async (dispatch) => {
    await followUnfollowFlow(dispatch, id, usersAPI.unFollowUser.bind(usersAPI), usersActions.followAC)
}

export const unFollow = (id: number): ThunkType => async (dispatch) => {
    await followUnfollowFlow(dispatch, id, usersAPI.followUser.bind(usersAPI), usersActions.unFollowAC)
}

const followUnfollowFlow = async (dispatch: Dispatch, id: number, apiMethod: ApiMethod, actionCreator: ActionCreator) => {
    dispatch(usersActions.toggleIsFollowingProgress(true, id))
    const res = await apiMethod(id)
    if (res.data.resultCode === ResultCode.SUCCESS) {
        dispatch(actionCreator(id))
    }
    dispatch(usersActions.toggleIsFollowingProgress(false, id))
}


export type ActionTypes = InferActionsType<typeof usersActions>
export type InitialStateType = typeof initialState
export type FilterForm = typeof initialState.filter
type ApiMethod = (id: number) => Promise<AxiosResponse>
type ActionCreator = (id: number) => Action
type ThunkType = BaseThunkType<ActionTypes>
