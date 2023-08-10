import {Dispatch} from "redux";
import {usersAPI} from "../api/api";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET-USER-PROFILE';


export type ProfileType = {
    aboutMe: string
    contacts: {
        facebook: string
        website: null | string
        vk: string
        twitter: string
        instagram: string
        youtube: null | string
        github: string
        mainLink: null | string
    },
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: {
        small: string
        large: string
    }
}

export type PostsType = {
    id?: number
    message: string
    likeCount: number
}

type AddPostACType = ReturnType<typeof addPostAC>
type UpdateNewPostTextACType = ReturnType<typeof changeNewTextAC>
type setUserProfileACType = ReturnType<typeof setUserProfile>

type InitialStateType = typeof initialState

type ActionTypes = AddPostACType | UpdateNewPostTextACType | setUserProfileACType

let initialState = {
    posts: [
        {id: 1, message: 'Hello', likeCount: 20},
        {id: 2, message: 'Hi', likeCount: 10},
        {id: 3, message: 'How are You', likeCount: 15},
    ] as Array<PostsType>,
    newPostText: '',
    profile: null
}

export const profileReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            const newPost = {id: new Date().getTime(), message: state.newPostText, likeCount: 0}
            return {...state, posts: [...state.posts, newPost], newPostText: ''};
        case UPDATE_NEW_POST:
            return {...state, newPostText: action.postText};
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
        default:
            return state || initialState
    }
}

export const addPostAC = (postText: string) => ({type: ADD_POST, newPostText: postText}) as const
export const changeNewTextAC = (postText: string) => ({type: UPDATE_NEW_POST, postText}) as const
const setUserProfile = (profile: any) => ({type: SET_USER_PROFILE, profile}) as const

export const getProfile = (id: string) => (dispatch: Dispatch) => {
    usersAPI.getUserProfile(id).then(data => {
        dispatch(setUserProfile(data))
    })
}