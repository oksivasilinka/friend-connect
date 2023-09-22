import { instance } from 'api/commonApi'

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
        const res = await instance.put<ResponseType>(`profile/status`, { status })
        return res.data
    },
    savePhoto: async (file: File) => {
        let formData = new FormData()
        formData.append("image", file)
        const res = await instance.put<ResponseType<{ photos: PhotosType }>>(`profile/photo`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
        return res.data
    },
    saveProfile: async (profile: ProfileResponseType) => {
        const res = await instance.put<ResponseType>("profile", profile)
        return res.data
    }
}


export type ResponseType<T = {}, R = ResultCode> = {
    resultCode: R
    messages: string[],
    data: T
}



export type UserResponseType = {
    name: string
    id: number
    photos: PhotosType
    status: string | null,
    followed: boolean
}

export type UsersResponseType = {
    items: UserResponseType[]
    totalCount: number
    error: string | null
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

export type ProfileResponseType = {
    aboutMe?: string | undefined
    contacts?: ContactsType | undefined | {}
    lookingForAJob?: boolean | undefined
    lookingForAJobDescription?: string | undefined
    fullName?: string | undefined
    userId?: number | undefined
    photos: PhotosType
}

export enum ResultCode {
    SUCCESS = 0,
    ERROR = 1,
}

