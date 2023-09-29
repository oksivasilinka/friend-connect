import { BaseResponseType, instance } from 'api/commonApi'

export const profileAPI = {
    getUserProfile: async (userId: number) => {
        const res = await instance.get<ProfileResponseType>(`profile/${userId}`)
        return res.data
    },
    getStatus: async (userId: number) => {
        const res = await instance.get<string>(`profile/status/${userId}`)
        return res.data
    },
    updateStatus: async (status: string) => {
        const res = await instance.put<BaseResponseType>(`profile/status`, { status })
        return res.data
    },
    savePhoto: async (file: File) => {
        let formData = new FormData()
        formData.append('image', file)
        const res = await instance.put<BaseResponseType<{ photos: PhotosType }>>(`profile/photo`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        return res.data
    },
    saveProfile: async (profile: ProfileResponseType) => {
        const res = await instance.put<BaseResponseType>('profile', profile)
        return res.data
    }
}


export type ProfileResponseType = {
    userId?: number | undefined
    lookingForAJob?: boolean | undefined
    lookingForAJobDescription?: string | undefined
    fullName?: string | undefined
    contacts?: ContactsType | undefined | {}
    photos: PhotosType
    aboutMe?: string | undefined // or mainLink
}

export type ContactsType = {
    facebook?: string | null
    website?: string | null
    vk?: string | null
    twitter?: string | null
    instagram?: string | null
    youtube?: string | null
    github?: string | null
    mainLink?: string | null
}

export type PhotosType = {
    small: string | null
    large: string | null
}

export enum ResultCode {
    SUCCESS = 0,
    ERROR = 1,
}

