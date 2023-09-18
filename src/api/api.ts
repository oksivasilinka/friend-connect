import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    headers: {'API-KEY': 'b8ffb6e7-45c3-4a90-bff5-2d282762bc9f'},
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})

export const usersAPI = {
    getUsers: async (currentPage: number, pageSize: number) => {
        const res = await instance.get<UsersResponseType>(`users?page=${currentPage}&count=${pageSize}`);
        return res.data;
    },
    followUser: (userId: number) => {
        return instance.post<ResponseType>(`follow/${userId}`, {})
    },
    unFollowUser: (userId: number) => {
        return instance.delete<ResponseType>(`follow/${userId}`)
    },
}

export const authAPI = {
    me: async () => {
        const res = await instance.get<ResponseType<MeResponseData>>(`auth/me`);
        return res.data;
    },
    login: async (email: string, password: string, rememberMe = false, captcha: string | null = null) => {
        const res = await instance.post<ResponseType<{ data: LoginResponseData }, ResultCode & ResultCodeForCaptcha>>(`auth/login`, {email, password, rememberMe, captcha});
        return res.data;
    },
    logout: async () => {
        const res = await instance.delete<ResponseType>(`auth/login`);
        return res.data;
    },
}

export const profileAPI = {
    getUserProfile: async (userId: number) => {
        const res = await instance.get<ProfileResponseType>(`profile/${userId}`);
        return res.data;
    },
    getStatus: async (userId: number) => {
        const res = await instance.get<string>(`profile/status/${userId}`);
        return res.data;
    },
    updateStatus: async (status: string) => {
        const res = await instance.put<ResponseType>(`profile/status`, {status});
        return res.data;
    },
    savePhoto: async (file: File) => {
        let formData = new FormData()
        formData.append('image', file)
        const res = await instance.put<ResponseType<{ photos: PhotosType }>>(`profile/photo`, formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        });
        return res.data;
    },
    saveProfile: async (profile: ProfileResponseType) => {
        const res = await instance.put<ResponseType>('profile', profile);
        return res.data;
    }
}

export const securityAPI = {
    getCaptchaUrl: async () => {
        const res = await instance.get<CaptchaResponseType>(`security/get-captcha-url`);
        return res.data;
    },
}

type ResponseType<T = {}, R = ResultCode> = {
    resultCode: R
    messages: string[],
    data: T
}

type MeResponseData = {
    id: number
    email: string
    login: string
}

type LoginResponseData = {
    userId: number
    email: string
    login: string
}

type CaptchaResponseType = {
    url: string
}

export type UserResponseType = {
    name: string
    id: number
    photos: PhotosType
    status: string | null,
    followed: boolean
}

type UsersResponseType = {
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

export enum ResultCodeForCaptcha {
    CAPTCHA = 10
}