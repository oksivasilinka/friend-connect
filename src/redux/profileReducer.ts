import {Dispatch} from "redux";
import {ProfileAPI} from "api/api";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';
const DELETE_POST = 'DELETE-POST';
const SET_PHOTO = 'SET-PHOTO';


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
type SetUserProfileACType = ReturnType<typeof setUserProfile>
type SetStatusACType = ReturnType<typeof setStatus>
type DeletePostACType = ReturnType<typeof deletePostAC>
type SetPhotoSuccessType = ReturnType<typeof setPhotoSuccess>

type InitialStateType = typeof initialState

type ActionTypes = AddPostACType | SetUserProfileACType | SetStatusACType | DeletePostACType | SetPhotoSuccessType

let initialState = {
    posts: [
        {id: 1, message: 'Hello', likeCount: 20},
        {id: 2, message: 'Hi', likeCount: 10},
        {id: 3, message: 'How are You', likeCount: 15},
    ] as PostsType[],
    profile: null as any,
    status: ''
}


export const profileReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            const newPost = {id: new Date().getTime(), message: action.newPostText, likeCount: 0}
            return {...state, posts: [...state.posts, newPost]};
        case DELETE_POST:
            return {...state, posts: state.posts.filter(el => el.id != action.id)};
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
        case SET_STATUS:
            return {...state, status: action.status}
        case SET_PHOTO:
            return {...state, profile: {...state.profile, photos: action.file}}
        default:
            return state || initialState
    }
}

export const addPostAC = (postText: string) => ({type: ADD_POST, newPostText: postText}) as const
export const setUserProfile = (profile: any) => ({type: SET_USER_PROFILE, profile}) as const
export const setStatus = (status: string) => ({type: SET_STATUS, status}) as const
export const deletePostAC = (id: number) => ({type: DELETE_POST, id}) as const
export const setPhotoSuccess = (file: File) => ({type: SET_PHOTO, file}) as const

export const getProfile = (id: string) => async (dispatch: Dispatch) => {
    let data = await ProfileAPI.getUserProfile(id)
    dispatch(setUserProfile(data))
}

export const getStatus = (userId: string) => async (dispatch: Dispatch) => {
    let res = await ProfileAPI.getStatus(userId)
    dispatch(setStatus(res))
}

export const updateStatus = (status: string) => async (dispatch: Dispatch) => {
    let res = await ProfileAPI.updateStatus(status)
    if (res.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}

export const savePhoto = (file: File) => async (dispatch: Dispatch) => {
    let res = await ProfileAPI.savePhoto(file)
    if (res.data.resultCode === 0) {
        dispatch(setPhotoSuccess(res.data.data.photos))
    }
}