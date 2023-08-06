const FOLLOW = "FOLLOW";
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_COUNT = 'SET-TOTAL-COUNT';

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


export type followACType = ReturnType<typeof followAC>
export type unFollowACType = ReturnType<typeof unFollowAC>
export type setUsersACType = ReturnType<typeof setUsersAC>
export type setCurrentPageACType = ReturnType<typeof setCurrentPageAC>
export type setTotalUsersCountACType = ReturnType<typeof setTotalUsersCountAC>

export type InitialStateType = typeof initialState

export type ActionTypes = followACType | unFollowACType | setUsersACType | setCurrentPageACType | setTotalUsersCountACType

export let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 10,
    totalCount: 0,
    currentPage: 1
}

export const usersReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW : {
            return {
                ...state,
                users: state.users.map(u => u.id === action.id ? {...u, followed: true} : u)
            }
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: state.users.map(u => u.id === action.id ? {...u, followed: false} : u)
            }
        }
        case SET_USERS: {
            // return {...state, users: action.users}
            return {...state, users: [...action.users]}
        }
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_TOTAL_COUNT:
            return {...state, totalCount: action.count}
        default:
            return state || initialState
    }
}

export const followAC = (id: number) => ({
    type: FOLLOW, id
}) as const

export const unFollowAC = (id: number) => ({
    type: UNFOLLOW, id
}) as const

export const setUsersAC = (users: UsersType[]) => ({
    type: SET_USERS, users
}) as const

export const setCurrentPageAC = (currentPage: number) => ({
    type: SET_CURRENT_PAGE, currentPage
}) as const

export const setTotalUsersCountAC = (totalCount: number) => ({
    type: SET_TOTAL_COUNT, count: totalCount
}) as const