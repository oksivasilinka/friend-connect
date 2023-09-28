import { PhotosType, profileAPI, ProfileResponseType, ResultCode } from "api/profileApi"
import { AppRootStateType, InferActionsType, ThunkType } from 'redux/store'
import { stopSubmit } from "redux-form"

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
        case 'ADD_POST':
            const newPost = { id: new Date().getTime(), message: action.newPostText, likeCount: 0 }
            return { ...state, posts: [...state.posts, newPost] }
        case 'DELETE_POST':
            return { ...state, posts: state.posts.filter(el => el.id != action.id) }
        case 'SET_USER_PROFILE':
            return { ...state, profile: action.profile }
        case 'SET_STATUS':
            return { ...state, status: action.status }
        case 'SET_PHOTO':
            return { ...state, profile: { ...state.profile, photos: action.photos } }
        default:
            return state || initialState
    }
}
export const profileActions = {
    addPostAC: (postText: string) => ({ type: 'ADD_POST', newPostText: postText }) as const,
    setUserProfile: (profile: ProfileResponseType) => ({ type: 'SET_USER_PROFILE', profile }) as const,
    setStatus: (status: string) => ({ type: 'SET_STATUS', status }) as const,
    deletePostAC: (id: number) => ({ type: 'DELETE_POST', id }) as const,
    setPhotoSuccess: (photos: PhotosType) => ({ type: 'SET_PHOTO', photos }) as const
}


export const getProfile = (id: number) => async (dispatch: ThunkType) => {
    let data = await profileAPI.getUserProfile(id)
    dispatch(profileActions.setUserProfile(data))
}

export const getStatus = (userId: number) => async (dispatch: ThunkType) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(profileActions.setStatus(data))
}

export const updateStatus = (status: string) => async (dispatch: ThunkType) => {
    let data = await profileAPI.updateStatus(status)
    if (data.resultCode === ResultCode.SUCCESS) {
        dispatch(profileActions.setStatus(status))
    } else {
        console.log(data.messages[0])
    }
}

export const savePhoto = (file: File) => async (dispatch: ThunkType) => {
    let photoData = await profileAPI.savePhoto(file)
    if (photoData.resultCode === ResultCode.SUCCESS) {
        dispatch(profileActions.setPhotoSuccess(photoData.data.photos))
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
type InitialStateType = typeof initialState
type ActionTypes = InferActionsType<typeof profileActions>