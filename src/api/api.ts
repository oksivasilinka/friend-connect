import axios from "axios";
import {ProfileType} from "redux/profileReducer";

const instance = axios.create({
    withCredentials: true,
    headers: {'API-KEY': 'b8ffb6e7-45c3-4a90-bff5-2d282762bc9f'},
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})

export const usersAPI = {
    getUsers: (currentPage: number, pageSize: number) => {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
    },
    getAuthMe: () => {
        return instance.get(`auth/me`)
    },
    followUser: (userId: number) => {
        return instance.post(`follow/${userId}`, {})
    },
    unFollowUser: (userId: number) => {
        return instance.delete(`follow/${userId}`)
    },
    loginUser: (email: string, password: string, rememberMe: boolean = false) => {
        return instance.post(`auth/login`, {email, password, rememberMe})
    },
    logOut: () => {
        return instance.delete(`auth/login`,)
    },
}

export const ProfileAPI = {
    getUserProfile: (userId: string) => {
        return instance.get(`profile/${userId}`)
            .then(res => res.data)
    },
    getStatus: (userId: string) => {
        return instance.get(`profile/status/${userId}`)
            .then(res => res.data)
    },
    updateStatus: (status: string) => {
        return instance.put(`profile/status`, {status})
            .then(res => res.data)
    },
    savePhoto: (file: File) => {
        let formData = new FormData()
        formData.append('image', file)
        return instance.put(`/profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => res.data)
    },
    saveProfile: (profile: ProfileType) => {
        return instance.put('/profile', profile)
            .then(res => res.data)
    },
}

