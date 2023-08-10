import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    headers: {'API-KEY': 'b8ffb6e7-45c3-4a90-bff5-2d282762bc9f'},
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})

export const usersAPI = {
    getUsers: (currentPage: number, pageSize: number) => {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(res => res.data)
    },
    getUserProfile: (userId: string) => {
        return instance.get(`profile/${userId}`)
            .then(res => res.data)
    },
    getAuthMe: () => {
        return instance.get(`auth/me`)
            .then(res => res.data)
    },
    followUser: (userId: number) => {
        return instance.post(`follow/${userId}`, {})
            .then(res => res.data)
    },
    unFollowUser: (userId: number) => {
        return instance.delete(`follow/${userId}`)
            .then(res => res.data)
    }
}
