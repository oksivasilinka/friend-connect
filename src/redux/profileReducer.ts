import { PhotosType, profileAPI, ProfileResponseType, ResultCode } from 'api/profileApi'
import { AppRootStateType, AppThunk, BaseThunkType, InferActionsType } from 'redux/store'
import { FormAction, stopSubmit } from 'redux-form'

let initialState = {
    profile: null as ProfileResponseType | null,
    status: ''
}

export const profileReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
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
    setUserProfile: (profile: ProfileResponseType) => ({ type: 'SET_USER_PROFILE', profile }) as const,
    setStatus: (status: string) => ({ type: 'SET_STATUS', status }) as const,
    setPhotoSuccess: (photos: PhotosType) => ({ type: 'SET_PHOTO', photos }) as const
}


export const getProfile = (id: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getUserProfile(id)
    try {
        dispatch(profileActions.setUserProfile(data))
    } finally {
    }
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(profileActions.setStatus(data))
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.updateStatus(status)
    if (data.resultCode === ResultCode.SUCCESS) {
        dispatch(profileActions.setStatus(status))
    } else {
        console.log(data.messages[0])
    }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let photoData = await profileAPI.savePhoto(file)
    if (photoData.resultCode === ResultCode.SUCCESS) {
        dispatch(profileActions.setPhotoSuccess(photoData.data.photos))
    }
}

export const saveProfile = (profile: ProfileResponseType): AppThunk =>
    async (dispatch, getState: () => AppRootStateType) => {
        const userId = getState().auth.id
        if (!!userId) {
            const data = await profileAPI.saveProfile(profile)
            if (data.resultCode === ResultCode.SUCCESS) {
                await dispatch(getProfile(userId))
                return Promise.resolve()
            } else {
                dispatch(stopSubmit('edit-profilePage', { _error: data.messages[0] }))
                return Promise.reject(data.messages[0])
            }
        }
    }


type InitialStateType = typeof initialState
type ActionTypes = InferActionsType<typeof profileActions>
type ThunkType = BaseThunkType<ActionTypes | FormAction>