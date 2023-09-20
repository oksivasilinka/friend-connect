import { Dispatch } from "redux"
import { PhotosType, profileAPI, ProfileResponseType, ResultCode } from "api/api"
import { AppRootStateType, ThunkType } from "redux/store"
import { stopSubmit } from "redux-form"

const ADD_POST = "ADD-POST"
const SET_USER_PROFILE = "SET-USER-PROFILE"
const SET_STATUS = "SET-STATUS"
const DELETE_POST = "DELETE-POST"
const SET_PHOTO = "SET-PHOTO"


let initialState = {
    posts: [
        { id: 1, message: "Hello", likeCount: 20 },
        { id: 2, message: "Hi", likeCount: 10 },
        { id: 3, message: "How are You", likeCount: 15 }
    ] as PostsType[],
    profile: null as ProfileResponseType | null,
    status: ""
}

export const profileReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            const newPost = { id: new Date().getTime(), message: action.newPostText, likeCount: 0 }
            return { ...state, posts: [...state.posts, newPost] }
        case DELETE_POST:
            return { ...state, posts: state.posts.filter(el => el.id != action.id) }
        case SET_USER_PROFILE:
            return { ...state, profile: action.profile }
        case SET_STATUS:
            return { ...state, status: action.status }
        case SET_PHOTO:
            return { ...state, profile: { ...state.profile, photos: action.photos } }
        default:
            return state || initialState
    }
}

export const addPostAC = (postText: string) => ({ type: ADD_POST, newPostText: postText }) as const
export const setUserProfile = (profile: ProfileResponseType) => ({ type: SET_USER_PROFILE, profile }) as const
export const setStatus = (status: string) => ({ type: SET_STATUS, status }) as const
export const deletePostAC = (id: number) => ({ type: DELETE_POST, id }) as const
export const setPhotoSuccess = (photos: PhotosType) => ({ type: SET_PHOTO, photos }) as const

export const getProfile = (id: number) => async (dispatch: Dispatch) => {
    let data = await profileAPI.getUserProfile(id)
    dispatch(setUserProfile(data))
}

export const getStatus = (userId: number) => async (dispatch: Dispatch) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(setStatus(data))
}

export const updateStatus = (status: string) => async (dispatch: Dispatch) => {
    let data = await profileAPI.updateStatus(status)
    if (data.resultCode === ResultCode.SUCCESS) {
        dispatch(setStatus(status))
    } else {
        console.log(data.messages[0])
    }
}

export const savePhoto = (file: File) => async (dispatch: Dispatch) => {
    let photoData = await profileAPI.savePhoto(file)
    if (photoData.resultCode === ResultCode.SUCCESS) {
        dispatch(setPhotoSuccess(photoData.data.photos))
    }
}

export const saveProfile = (profile: ProfileResponseType) =>
    async (dispatch: ThunkType, getState: () => AppRootStateType) => {
        const userId = getState().auth.id
        if (!!userId) {
            const data = await profileAPI.saveProfile(profile)
            if (data.resultCode === ResultCode.SUCCESS) {
                await dispatch(getProfile(userId))
                return Promise.resolve()
            } else {
                dispatch(stopSubmit("edit-profile", { _error: data.messages[0] }))
                // dispatch(stopSubmit('edit-profile', {'contacts': {'facebook': data.messages[0]}}))
                return Promise.reject(data.messages[0])
            }
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