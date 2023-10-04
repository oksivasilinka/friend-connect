import { BaseResponseType, instance } from 'api/commonApi'
import { PhotosType } from 'api/profileApi'


export const usersAPI = {
    getUsers: async (currentPage: number, pageSize: number, term: string  | null='' , friend: null | boolean = null) => {
        const res = await instance
            .get<UsersResponseType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend=== null ? '' : `&friend=${friend}`))
        return res.data
    },
    followUser: (userId: number) => {
        return instance.post<BaseResponseType>(`follow/${userId}`, {})
    },
    unFollowUser: (userId: number) => {
        return instance.delete<BaseResponseType>(`follow/${userId}`)
    }
}
export type UsersResponseType = {
    items: UserResponseType[]
    totalCount: number
    error: string | null
}

export type UserResponseType = {
    name: string
    id: number
    photos: PhotosType
    status: string | null,
    followed: boolean
}