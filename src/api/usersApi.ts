import { instance } from 'api/commonApi'
import { ResponseType, UsersResponseType } from 'api/profileApi'


export const usersAPI = {
    getUsers: async (currentPage: number, pageSize: number) => {
        const res = await instance.get<UsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
        return res.data
    },
    followUser: (userId: number) => {
        return instance.post<ResponseType>(`follow/${userId}`, {})
    },
    unFollowUser: (userId: number) => {
        return instance.delete<ResponseType>(`follow/${userId}`)
    }
}

