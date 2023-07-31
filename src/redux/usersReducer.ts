const FOLLOW = "FOLLOW";
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';

type LocationUsersType = {
    city: string
    country: string
}

export type UsersType = {
    id: number
    photoUrl: string
    followed: boolean
    fullName: string
    status: string
    location: LocationUsersType
}


export type followACType = ReturnType<typeof followAC>
export type unFollowACType = ReturnType<typeof unFollowAC>
export type setUsersACType = ReturnType<typeof setUsersAC>

export type InitialStateType = typeof initialState

export type ActionTypes = followACType | unFollowACType | setUsersACType

export let initialState = {
    users: [
        // {
        //     id: 1,
        //     photoUrl: 'https://oir.mobi/uploads/posts/2021-04/1619619348_59-oir_mobi-p-samie-milie-kotiki-zhivotnie-krasivo-foto-65.jpg',
        //     followed: true,
        //     fullName: 'Dmitry',
        //     status: 'i am a boss',
        //     location: {
        //         city: 'Minsk', country: 'Belarus'
        //     }
        // },
        // {
        //     id: 2,
        //     photoUrl: 'https://oir.mobi/uploads/posts/2021-04/1619619348_59-oir_mobi-p-samie-milie-kotiki-zhivotnie-krasivo-foto-65.jpg',
        //     followed: true,
        //     fullName: 'Vova',
        //     status: 'i am a boss',
        //     location: {
        //         city: 'Minsk', country: 'Belarus'
        //     }
        // },
        // {
        //     id: 3,
        //     photoUrl: 'https://oir.mobi/uploads/posts/2021-04/1619619348_59-oir_mobi-p-samie-milie-kotiki-zhivotnie-krasivo-foto-65.jpg',
        //     followed: true,
        //     fullName: 'Valera',
        //     status: 'i am a cat',
        //     location: {
        //         city: 'Minsk', country: 'Belarus'
        //     }
        // },
        // {
        //     id: 4,
        //     photoUrl: 'https://oir.mobi/uploads/posts/2021-04/1619619348_59-oir_mobi-p-samie-milie-kotiki-zhivotnie-krasivo-foto-65.jpg',
        //     followed: false,
        //     fullName: 'Oksana',
        //     status: 'i am a boss',
        //     location: {
        //         city: 'Minsk', country: 'Belarus'
        //     }
        // },
        // {
        //     id: 5,
        //     photoUrl: 'https://oir.mobi/uploads/posts/2021-04/1619619348_59-oir_mobi-p-samie-milie-kotiki-zhivotnie-krasivo-foto-65.jpg',
        //     followed: false,
        //     fullName: 'Dory',
        //     status: 'i am a dog',
        //     location: {
        //         city: 'Novopolotsk', country: 'Belarus'
        //     }
        // },
    ] as Array<UsersType>
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
            return {...state, users: [...state.users, ...action.users]}
        }
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



